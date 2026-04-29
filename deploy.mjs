/**
 * Generic deploy script — reads ./.deploy-config.json from the project folder.
 *
 * Expected config shape:
 * {
 *   "clientName": "Acme Corp",
 *   "deployDir":  "C:/Users/ollie/acme-deploy",
 *   "repoUrl":    "https://github.com/OllieHardy91/acme-deck.git",
 *   "sourceFile": "index.html",                          // file to publish as /index.html
 *   "assets":     ["brand_assets/logo.png", "hero.jpg"]  // extra files to copy as-is
 * }
 *
 * Vercel must be wired to the deploy repo's main branch — push triggers auto-deploy.
 */

import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = resolve(__dir, '.deploy-config.json');

if (!existsSync(CONFIG_PATH)) {
  console.error('✗ Missing .deploy-config.json in this folder.');
  console.error('  Copy .deploy-config.json.example and fill in the client values.');
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
const required = ['clientName', 'deployDir', 'repoUrl', 'sourceFile'];
const missing = required.filter(k => !cfg[k]);
if (missing.length) {
  console.error(`✗ .deploy-config.json missing keys: ${missing.join(', ')}`);
  process.exit(1);
}

const { clientName, deployDir, repoUrl, sourceFile } = cfg;
const assets = cfg.assets || [];

// Per-command identity overrides — keeps the deploy repo working even when
// global git config has no user.name/user.email set.
const IDENT = `-c user.name="OllieHardy91" -c user.email="OllieHardy91@users.noreply.github.com"`;

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });

const copy = (src, dest) => {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`  copied: ${dest.replace(deployDir, '')}`);
};

console.log(`Deploying ${clientName}...`);

if (!existsSync(deployDir + '/.git')) {
  console.log(`Cloning ${repoUrl}...`);
  run(`git clone ${repoUrl} "${deployDir}"`);
} else {
  console.log('Pulling latest from GitHub...');
  run('git pull', deployDir);
}

console.log('\nSyncing files:');
copy(resolve(__dir, sourceFile), `${deployDir}/index.html`);
for (const asset of assets) {
  copy(resolve(__dir, asset), `${deployDir}/${asset}`);
}

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
run('git add .', deployDir);

const status = execSync('git status --porcelain', { cwd: deployDir, encoding: 'utf8' }).trim();
if (!status) {
  console.log('\n✓ Nothing changed — already up to date.');
  process.exit(0);
}

try {
  run(`git ${IDENT} commit -m "Deploy ${sourceFile} — ${stamp}"`, deployDir);
} catch (err) {
  console.error('\n✗ Commit failed:', err.message);
  process.exit(1);
}

try {
  run('git push', deployDir);
} catch (err) {
  console.error('\n✗ Push failed:', err.message);
  console.error('  (commit was created locally — re-run after fixing the issue)');
  process.exit(1);
}

console.log(`\n✓ Pushed to ${repoUrl}`);
console.log('  Vercel will auto-deploy in ~30 seconds.');
