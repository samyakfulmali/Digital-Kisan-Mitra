const { build } = require('esbuild');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

async function buildApp() {
  await build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    outfile: path.join(DIST_DIR, 'app.js'),
    format: 'iife',
    globalName: 'App',
    loader: {
      '.jsx': 'jsx',
      '.js': 'jsx',
      '.css': 'css',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.svg': 'dataurl'
    },
    define: {
      'process.env.REACT_APP_API_BASE_URL': '"http://localhost:5000/api"',
      'process.env.NODE_ENV': '"development"'
    },
    sourcemap: true,
    target: 'es2015',
    jsx: 'automatic',
    jsxImportSource: 'react'
  });
}

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

async function startDevServer() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Build initial
  await buildApp();
  console.log('Initial build complete');

  // Copy index.html to dist
  fs.copyFileSync('index.html', path.join(DIST_DIR, 'index.html'));

  // Watch for changes
  const ctx = await build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    outfile: path.join(DIST_DIR, 'app.js'),
    format: 'iife',
    globalName: 'App',
    loader: {
      '.jsx': 'jsx',
      '.js': 'jsx',
      '.css': 'css',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.svg': 'dataurl'
    },
    define: {
      'process.env.REACT_APP_API_BASE_URL': '"http://localhost:5000/api"',
      'process.env.NODE_ENV': '"development"'
    },
    sourcemap: true,
    target: 'es2015',
    jsx: 'automatic',
    jsxImportSource: 'react',
    watch: {
      onRebuild(error, result) {
        if (error) console.log('Rebuild failed:', error);
        else console.log('Rebuilt');
      }
    }
  });

  // HTTP server
  const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(DIST_DIR, filePath);

    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };

    const contentType = contentTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // SPA fallback - serve index.html for routes
        if (!ext) {
          serveFile(res, path.join(DIST_DIR, 'index.html'), 'text/html');
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });

  server.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });

  process.on('SIGINT', async () => {
    await ctx.dispose();
    server.close();
    process.exit(0);
  });
}

startDevServer().catch(() => process.exit(1));