const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); //protocolo http
const io = require('socket.io')(server); //protocolo ws websocket

const usuario = require("./usuario");

var bcrypt = require('bcryptjs');

var crypt = (senha) =>{ 
    return new Promise(function(resolve, reject){
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

io.on('connection', socket => {
    console.log("Socket conectado:" + socket.id);
    //socket.broadcast.emit("teste", "hi"); //teste 
    // console.log(usuario.update_user(4, "Fred", "123333")); //teste
    socket.on('login', user => { //pedido de login
        console.log(user);
        usuario.select_user(user.username).then(function (result) { //promisse procura user no db
                if (result.length != 0) {
                    if(bcrypt.compareSync(user.password, result[0].senha)) socket.emit("logged", result); //se encontrado
                }
                else socket.emit("loginError", "Usuário e/ou senha incorretos!"); //se não for encontrado
        }).catch(function (err) {
            console.log(err);
        });

    });

    socket.on('register',register =>{ //cadastrar usuario 
        crypt(register.senha).then(function(senha){
            senhaHash = senha;
            usuario.insert_user(register.nome, register.email,senhaHash,register.telefone);
        }).catch(function(){
            console.log("Não foi inserido!");
        });

    });
    socket.on("addChat", users =>{
       var result = "consulta ao banco aqui";

       var chat = "";
       if(result.length == 0){ //senão encontrar um chat
           //tbChat.creatChat()
           var chat;  //consulta para recuperar o chat no banco afim de saber o id
       }
       socket.emit("chat", chat);
    });
    socket.on("joinChat", chat =>{
        socket.on('sendMessage'+chat[id], data => {
            console.log(data);
            messages.push(data);
            socket.broadcast.emit('receivedMessage'+chat[id], data);
        });
    })

});
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
