const http = require("http");
const express = require("express");
const app = express();

const { Server } = require("socket.io");
const cors = require("cors");

//server setup
const server = http.createServer(app);
//middleware
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

//connect to socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  socket.on("typing", (username) => {
    console.log(username + " is typing ");

    socket.broadcast.emit("typing", username + " is typing...");
  });
});

//listen to PORT
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log("server listenning on port" + PORT);
});
