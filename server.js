const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("Client connecté :", socket.id);

    socket.on("offer", (offer) => {
        console.log("📱 Offre reçue");
        socket.broadcast.emit("offer", offer);
    });

    socket.on("answer", (answer) => {
        console.log("💻 Réponse reçue");
        socket.broadcast.emit("answer", answer);
    });

    socket.on("disconnect", () => {
        console.log("Client déconnecté :", socket.id);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});