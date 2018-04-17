import * as http from "http";
import app from "./app";
const cron = require("node-cron");
const port = normalizePort(process.env.PORT || 3000);
const server = http.createServer(app);

let mensagens: any[] = [];

// server
server.listen(port);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}
