import * as http from "http";
import app from "./app";
import { EnviaEmailController } from "./modulos/envia-email/envia-email-controller";
import { GitHubController } from "./modulos/github/github-controller";

const cron = require("node-cron");
const port = normalizePort(process.env.PORT || 3001);
const server = http.createServer(app);

const email = new EnviaEmailController();
const gitHub = new GitHubController();

let mensagens: any[] = [];

// server
server.listen(port);
server.on("listening", onListening);

cron.schedule("1 * * * * *", () => {
  // console.log("enviar email");
  // email.enviaEmail();
  // console.log("pega commits");
  // gitHub.getUltimosCommits();
});

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
