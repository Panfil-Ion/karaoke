const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

/** @type {{ mode: 'idle' | 'active', singer: object | null }} */
let currentState = { mode: "idle", singer: null };

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    socket.emit("state-update", currentState);

    socket.on("trigger-display", (data) => {
      currentState = { mode: "active", singer: data };
      io.emit("state-update", currentState);
    });

    socket.on("clear-screen", () => {
      currentState = { mode: "idle", singer: null };
      io.emit("state-update", currentState);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Karaoke server ready on http://${hostname}:${port}`);
    });
});
