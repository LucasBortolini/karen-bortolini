#!/bin/sh
set -e

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

node <<'EOF'
const { execSync } = require('child_process');

try {
  require('rollup');
  process.exit(0);
} catch {
  // npm ci from a macOS lockfile skips Linux optional Rollup binaries.
}

const version = require('rollup/package.json').version;
const { platform, arch } = process;

const candidates = [];
if (platform === 'linux') {
  const musl = (() => {
    try {
      return execSync('ldd /bin/ls 2>&1', { encoding: 'utf8' }).includes('musl');
    } catch {
      return false;
    }
  })();
  candidates.push(`@rollup/rollup-linux-${arch}-${musl ? 'musl' : 'gnu'}`);
} else if (platform === 'darwin') {
  candidates.push(`@rollup/rollup-darwin-${arch}`);
}

if (candidates.length === 0) {
  console.error(`Unsupported platform for Rollup native binary: ${platform} ${arch}`);
  process.exit(1);
}

for (const pkg of candidates) {
  try {
    execSync(`npm install ${pkg}@${version} --no-save`, { stdio: 'inherit' });
    require('rollup');
    process.exit(0);
  } catch {
    // try next candidate
  }
}

console.error('Failed to install Rollup native binary');
process.exit(1);
EOF
