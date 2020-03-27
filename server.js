
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server); //protocolo ws websocket

const usuario = require("./usuario");

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',(req,res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log("Socket conectado:"+socket.id);
    socket.broadcast.emit("teste", "hi");
    socket.on('login', user=>{   
        console.log(user);
        usuario(user.username, user.password).then(function(result){
            if(result.length != 0)
            socket.emit("logged", result);  
         }).catch(function(err){
             console.log(err);
         });
            
    });

    socket.on('sendMessage',data =>{
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data); 
    });
});
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
