const fs = require("fs");
const http = require("http");
const socketio = require("socket.io");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

const PORT = 3000;

const html = fs.readFileSync("./index.html");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(html);
});

const io = socketio(server);
io.on("connection", (client) => {
  client.broadcast.emit("message", `Пользователь ${client.id} Вошел в чат`);
  console.log(`Пользователь ${client.id} Вошел в чат`);

  client.on("message", (msg) => {
    client.broadcast.emit("message", msg);
  });

  client.on("disconnect", () => {
    client.broadcast.emit("message", `Пользователь ${client.id} Покинул чат`);
    console.log(`Пользователь ${client.id} Покинул чат`);
  });

  client.on('message', (data) => {
    console.log('Сообщение от ' + data);
  })

  rl.on("line", (line) => {
    client.emit("message", line);
  });


});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});