import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createConnection } from 'node:net';
import { loadEnv } from '../server/env.mjs';

loadEnv();

function canConnectToMySql() {
  const host = String(process.env.MYSQL_HOST || '127.0.0.1').trim();
  const port = Number(process.env.MYSQL_PORT) || 3306;

  return new Promise((resolve) => {
    const socket = createConnection({ host, port });
    const finish = (connected) => {
      socket.destroy();
      resolve(connected);
    };
    socket.setTimeout(750);
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.once('timeout', () => finish(false));
  });
}

async function ensureMySqlIsRunning() {
  if (String(process.env.DATABASE_MODE || '').trim().toLowerCase() !== 'mysql') {
    return;
  }

  if (await canConnectToMySql()) {
    return;
  }

  const binary = String(
    process.env.MYSQL_SERVER_BINARY ||
      'C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysqld.exe',
  ).trim();
  const dataDirectory = String(
    process.env.MYSQL_DATA_DIRECTORY ||
      'C:\\ProgramData\\MySQL\\MySQL Server 8.4\\Data',
  ).trim();

  if (!existsSync(binary) || !existsSync(dataDirectory)) {
    throw new Error(
      'MySQL Server is not installed or initialized. Check MYSQL_SERVER_BINARY and MYSQL_DATA_DIRECTORY.',
    );
  }

  const mysqlProcess = spawn(
    binary,
    [
      `--basedir=${binary.replace(/[\\/]bin[\\/]mysqld\.exe$/i, '')}`,
      `--datadir=${dataDirectory}`,
      `--port=${Number(process.env.MYSQL_PORT) || 3306}`,
      `--bind-address=${String(process.env.MYSQL_BIND_ADDRESS || '127.0.0.1').trim()}`,
    ],
    {
      detached: true,
      windowsHide: true,
      stdio: 'ignore',
    },
  );
  mysqlProcess.unref();

  for (let attempt = 0; attempt < 20; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (await canConnectToMySql()) {
      console.log('[mysql] Local MySQL server started on port 3306');
      return;
    }
  }

  throw new Error('MySQL Server did not become ready within 10 seconds.');
}

await ensureMySqlIsRunning();

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
