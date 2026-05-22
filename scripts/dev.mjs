import { spawn } from 'node:child_process';

const processes = [
  spawn('node', ['server/index.mjs'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, API_PORT: process.env.API_PORT || '3001' },
  }),
  spawn('npx', ['vite', '--host', '0.0.0.0'], {
    stdio: 'inherit',
    shell: true,
  }),
];

function shutdown() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

