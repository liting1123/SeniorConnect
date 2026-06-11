import { spawn } from 'node:child_process';

const processes = [
  {
    name: 'api',
    command: 'node',
    args: ['server/index.mjs'],
  },
  {
    name: 'web',
    command: 'node',
    args: ['./node_modules/vite/bin/vite.js', '--host', '0.0.0.0'],
  },
];

const children = [];
let shuttingDown = false;

function log(name, data) {
  const text = data.toString().replace(/\s+$/, '');

  if (text) {
    console.log(`[${name}] ${text}`);
  }
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(code);
}

for (const processConfig of processes) {
  const child = spawn(processConfig.command, processConfig.args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: false,
  });

  children.push(child);

  child.stdout.on('data', (data) => log(processConfig.name, data));
  child.stderr.on('data', (data) => log(processConfig.name, data));

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    console.log(`[${processConfig.name}] exited${signal ? ` with signal ${signal}` : ` with code ${code}`}`);
    shutdown(code || 1);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
