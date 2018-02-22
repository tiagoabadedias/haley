import * as http from "http";
import * as socketIo from "socket.io";
import app from "./app";
const socketJwt = require("socketio-jwt-auth");
const secretJwtKey = process.env.JWT_SECRET || "secretApiKey";
const cron = require("node-cron");
const port = normalizePort(process.env.PORT || 3000);
const server = http.createServer(app);

let mensagens: any[] = [];

const io = socketIo(server);

io.use(socketJwt.authenticate({
  secret: secretJwtKey,
}, (payload: any, done: any) => {
  return done(null, { payload });
}));

io.on("connection", (socket) => {
  
  console.log("Socket > Synchronized!");
  
  socket.on("disconnect", () => {
    console.log("Socket > Disconnected!", socket.request.user.payload.usuario.nome);
  });
  
  socket.on("connect_error", function(data: any) {
    console.log("connection_error");
  });

  // socket.on("socketIO", async (valor: any, item: any) => {
  // });
});

// server
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

cron.schedule("1 * * * * *", () => {
});

cron.schedule("00 59 23 * * 1-5", () => {
});

function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}
