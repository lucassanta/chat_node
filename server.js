const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server); //protocolo ws websocket

var connection = require("./connection");


const usuario = require("./usuario");
const tb_chats = require("./chat");
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

let messages = [];
var username;
io.on('connection', socket => {
    console.log("Socket conectado:" + socket.id);
    //socket.broadcast.emit("teste", "hi"); //teste 
    // console.log(usuario.update_user(4, "Fred", "123333")); //teste
    socket.on('login', user => { //pedido de login
        usuario.select_user(connection, user.username).then(function (result) { //promisse procura user no db
            console.log(user);
            if (bcrypt.compareSync(user.password, result[0].senha)) socket.emit("logged", result); //se encontrado
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
            console.log("Não foi inserido!");
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
        room = dadosObject.id;
        console.log(dadosObject.nome + " Entrou na sala : " + dadosObject.id);
        socket.join(dadosObject.id);
        console.log(room);

    });

    socket.to(room).on('sendMessage', data => {
        console.log("Enviou mensagem");
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
                    socket.emit("list_chats", chats);
                    console.log(chats);
                }).catch(function (err) {
                    console.log(err);
                });
            }

        }).catch(function (err) {
            console.log(err);
        });
    });

    socket.on("ChatsProntos",p => {
        var chatsProntos = true;
        socket.emit("ChatsProntos", chatsProntos);
    });
});
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
