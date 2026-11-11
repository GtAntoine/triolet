/**
 * A static file server for local previews and tests, no dependency:
 *   node tools/serve.ts <folder> [port]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

/** Serves `root` on localhost. Resolves once the server listens. */
export function serve(root: string, port: number): Promise<Server> {
  const folder = resolve(root);
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    let file = normalize(join(folder, path));
    // Never serve anything outside the folder.
    if (file !== folder && !file.startsWith(folder + sep)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    createReadStream(file).pipe(res);
  });
  return new Promise((done) => server.listen(port, '127.0.0.1', () => done(server)));
}

if (import.meta.main) {
  const folder = process.argv[2] ?? '.';
  const port = Number(process.argv[3] ?? 4173);
  await serve(folder, port);
  console.log(`Serving ${resolve(folder)} on http://localhost:${port}`);
}
