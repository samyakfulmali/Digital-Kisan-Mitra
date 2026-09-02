const { build } = require('esbuild');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');

async function buildProduction() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

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
      'process.env.NODE_ENV': '"production"'
    },
    minify: true,
    target: 'es2015',
    jsx: 'automatic',
    jsxImportSource: 'react'
  });

  // Copy index.html
  fs.copyFileSync('index.html', path.join(DIST_DIR, 'index.html'));

  console.log('Production build complete in dist/');
}

buildProduction().catch(() => process.exit(1));