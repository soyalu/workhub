import 'dotenv/config';
import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '127.0.0.1';
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Invalid PORT: expected an integer from 1 to 65535');
}
const app = await buildApp();
try { await app.listen({ port, host }); }
catch (error) { app.log.error(error); process.exitCode = 1; }
