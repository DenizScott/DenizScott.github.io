import { spawn } from 'node:child_process';

const p = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--user-data-dir=C:\\Users\\DenizScott\\AppData\\Local\\Temp\\edge_dbg',
  '--disable-gpu',
]);

await new Promise((r) => setTimeout(r, 1500));
const res = await fetch('http://127.0.0.1:9223/json/new?http://127.0.0.1:4173/en', { method: 'PUT' });
const target = await res.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 1;
const send = (m, params = {}) =>
  new Promise((r) => {
    const cur = id++;
    const onm = (ev) => {
      const d = JSON.parse(ev.data);
      if (d.id === cur) {
        ws.removeEventListener('message', onm);
        r(d.result);
      }
    };
    ws.addEventListener('message', onm);
    ws.send(JSON.stringify({ id: cur, method: m, params }));
  });

await send('Runtime.enable');
await send('Network.enable');

ws.addEventListener('message', (ev) => {
  const d = JSON.parse(ev.data);
  if (d.method === 'Network.loadingFailed') {
    console.error('Network load failed:', d.params);
  }
});

await new Promise((r) => setTimeout(r, 1500));
const ev = await send('Runtime.evaluate', {
  expression:
    'Array.from(document.images).map(i => ({ src: i.src, naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight, complete: i.complete, alt: i.alt }))',
  returnByValue: true,
});

console.log(JSON.stringify(ev.result.value, null, 2));

ws.close();
p.kill('SIGKILL');
process.exit(0);
