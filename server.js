const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server); //protocolo ws websocket

var connection = require("./connection");


const usuario = require("./usuario");
const tb_chats = require("./chat");
const message = require("./mensagem");
usuario.db_connect(connection);
var bcrypt = require('bcryptjs');

var crypt = (senha) => {
    return new Promise(function (resolve, reject) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(senha, salt);
        resolve(hash);
    });
}
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});


io.on('connection', socket => {
    console.log("Socket conectado:" + socket.id);
    let messages = [];
    var user_id;
    socket.on('login', user => { //pedido de login
        usuario.select_user(connection, user.username).then(function (result) { //promisse procura user no db
            console.log(user);
            if (bcrypt.compareSync(user.password, result[0].senha)){
                socket.emit("logged", result); //se encontrado
                user_id = result[0].id;
            }
                else socket.emit("loginError", "Usuário e/ou senha incorretos!"); //se encontrado, mas senha errada
        }).catch(function (err) {
            console.log(err);
        });
    });

    socket.on('register', register => { //cadastrar usuario 
        crypt(register.senha).then(function (senha) {
            senhaHash = senha;
            usuario.insert_user(connection, register.nome, register.email, senhaHash, register.telefone);
        }).catch(function () {
            console.log("Not inserted!");
        });

    });
    socket.on("addChat", users => {
        var result = "";
        tb.chats.validate_duplicate(connection, users.userIID, users.userIIID).then(function (result) {
            tb_chats.insert_chat(connection, users.userIID, users.userIIID);
        }).catch(function (err) {
            result = err;
            socket.emit("chat", result);
        });

        tb_chats.validate_duplicate(connection, users.userIID, users.userIIID).then(function (result) {
            tb_chats.insert_chat(connection, users.userIID, users.userIIID);
        }).catch(function (err) {
            result = err;
            socket.emit("chat", result);
        });
    });

    var room;
    socket.on("joinChat", dadosObject => {
        if(room !=  dadosObject.id){
            room = dadosObject.id;
            console.log(dadosObject.nome + " Join in chat : " + dadosObject.id);
            socket.join(dadosObject.id);
            message.select_all_messages(connection, dadosObject.id).then(function(result){
                socket.emit("listMessage",result);
            }).catch(function(err){
                console.log(err);
            });
            console.log(room);
        }
    });

    socket.to(room).on('sendMessage', data => {
        console.log("Message sent");
        console.log(user_id);
        tb_chats.select_receiver(connection, data.chatID, user_id).then(function(result){
            console.log(result[0].receiver);
            console.log(data.chatID);
            message.insert_message(connection,data.chatID, data.message, user_id,result[0].receiver);
        }).catch(function(err){ 
            console.log(err);
        });
        console.log(data);
        messages.push(data);
        socket.to(room).emit('receivedMessage', data);
    });

    //console.log(room);

    socket.on("list_chats", userIID => {
        var chats = [];
        tb_chats.select_all_chats(connection, userIID).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                tb_chats.select_all_chats_from(connection, userIID, result[i]["chatID"]).then(function (res) {
                    chats.push(res);
                    if(i = (result.length - 1)){
                    socket.emit("list_chats_server", chats);
                    }
                    console.log(chats);
                }).catch(function (err) {
                    console.log(err);
                });
            }

        }).catch(function (err) {
            console.log(err);
        });
    });

    socket.on("chatsReady",p => {
        console.log(true);
        var chatsReady = true;
        socket.emit("chatsReadyServer", chatsReady);
    });
});
server.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000");
});
