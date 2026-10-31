import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9224;
const USER_DATA = 'C:\\Users\\DenizScott\\AppData\\Local\\Temp\\edge_cdp_luden';

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureLuden() {
  console.log('Capturing LudenOS live screenshots...');
  mkdirSync(resolve('test_screenshots'), { recursive: true });

  const edgeProc = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  await delay(2000);

  try {
    const targetUrl = 'https://project-ludenx-1.vercel.app';
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${targetUrl}`, { method: 'PUT' });
    const target = await newTargetRes.json();
    console.log(`LudenOS opened: ${target.url}`);

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { resolve, reject } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error)));
        else resolve(data.result);
      }
    };

    await new Promise((r) => { ws.onopen = r; });

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await delay(4000);

    const titleRes = await send('Runtime.evaluate', { expression: 'document.title' });
    console.log(`LudenOS Title: ${titleRes.result.value}`);

    // Desktop hero view
    const heroShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(resolve('test_screenshots/ludenos-desktop.png'), Buffer.from(heroShot.data, 'base64'));
    console.log('Saved test_screenshots/ludenos-desktop.png');

    // Scroll down a bit to capture feed / features
    await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 600)' });
    await delay(1000);
    const feedShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(resolve('test_screenshots/ludenos-feed.png'), Buffer.from(feedShot.data, 'base64'));
    console.log('Saved test_screenshots/ludenos-feed.png');

    ws.close();
  } finally {
    edgeProc.kill();
  }
}

captureLuden().catch(console.error);
