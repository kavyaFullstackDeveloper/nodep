const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

//handle socket communication for chat functionalities 
io.on('connection', (Socket) => {
    console.log("A user connected");
    Socket.on('join-chat', (chatId) => {
        //logic to join a chat room 
        Socket.join(chatId)
    })

    Socket.on('send-message', (message) => {
        io.to(message.chatId).emit('new-message', message)
    })

    Socket.on('disconnect', ()=> {
        console.log('A user disconnected')
    })

})

http.listen(3000, ()=> {
    console.log('server is listening on the port 3000')
})