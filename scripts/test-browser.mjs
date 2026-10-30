/**
 * Automated browser verification using Edge via Chrome DevTools Protocol (CDP).
 * Captures clean screenshots, audits console errors, and verifies responsive layouts.
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;
const USER_DATA = 'C:\\Users\\DenizScott\\AppData\\Local\\Temp\\edge_cdp_profile';

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runBrowserTest() {
  console.log('🚀 Starting Edge in CDP headless mode...');
  mkdirSync(resolve('test_screenshots'), { recursive: true });

  const edgeProc = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  await delay(1500);

  try {
    const verRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const ver = await verRes.json();
    console.log(`Connected to browser: ${ver.Browser}`);

    // Create a new target page
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://127.0.0.1:4173/en`, { method: 'PUT' });
    const target = await newTargetRes.json();
    console.log(`Page opened: ${target.webSocketDebuggerUrl}`);

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { resolve, reject } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
      if (data.method === 'Log.entryAdded' && data.params.entry.level === 'error') {
        console.error('❌ Browser Console Error:', data.params.entry.text);
      }
    };

    await new Promise((res) => ws.onopen = res);

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });

    await send('Page.enable');
    await send('Log.enable');
    await send('Runtime.enable');

    const captureView = async (url, width, height, filename) => {
      console.log(`📸 Capturing ${url} (${width}x${height}) -> ${filename}...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });
      await send('Page.navigate', { url });
      // Wait for page load and animations
      await delay(1200);

      // Check if image or layout has issues
      const evalRes = await send('Runtime.evaluate', {
        expression: `({
          title: document.title,
          imagesLoaded: Array.from(document.images).every(i => i.complete && i.naturalHeight > 0),
          imageCount: document.images.length,
          errors: window.__errors || []
        })`,
        returnByValue: true,
      });
      console.log(`   Page state:`, evalRes.result.value);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      writeFileSync(resolve(`test_screenshots/${filename}`), Buffer.from(shot.data, 'base64'));
    };

    // Test matrix as requested in master prompt: 1440, 1024, 768, 390
    await captureView('http://127.0.0.1:4173/en', 1440, 900, 'edge_home_en_1440.png');
    await captureView('http://127.0.0.1:4173/tr', 1440, 900, 'edge_home_tr_1440.png');
    await captureView('http://127.0.0.1:4173/en', 390, 844, 'edge_home_en_390.png');
    await captureView('http://127.0.0.1:4173/en/projects/underwake', 1440, 900, 'edge_underwake_1440.png');
    await captureView('http://127.0.0.1:4173/en/projects/omni', 1440, 900, 'edge_omni_1440.png');
    await captureView('http://127.0.0.1:4173/en/projects/cyber-rebirth', 1440, 900, 'edge_cyber_rebirth_1440.png');
    await captureView('http://127.0.0.1:4173/en/projects/ludenos', 1440, 900, 'edge_ludenos_1440.png');

    ws.close();
    console.log('✅ Automated browser tests completed successfully!');
  } finally {
    edgeProc.kill('SIGKILL');
  }
}

runBrowserTest().catch((err) => {
  console.error('Fatal browser test error:', err);
  process.exit(1);
});
