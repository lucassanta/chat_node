var connection = require("./connection");

var message ="";

const db_connect = ()=>{
    connection.connect(function(err){
        if (err) throw err;
        console.log('Conectado!');
    });
}


const delete_message = (id)=>{
    db_connect();
    var sql = "DELETE FROM `mensagem` WHERE `id` = "+id+"";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Mensagem Excluída!");
    connection.end();
});
}

const update_message = (id, nome, senha)=>{
    db_connect();
    var sql = "UPDATE `mensagem` SET `nome` = '"+nome+"', `senha`='"+senha+"' WHERE `id` = "+id+"";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Mensagem Atualizada!");
    connection.end();
});
}


function select_message(email, senha){
    var message ="";
    db_connect();
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM mensagem WHERE email = '"+email+"' AND senha = '"+senha+"'", function (err, result, fields) {
        if (err)  return reject(err);
        resolve(result);
        //console.log(message);
        });
        connection.end();
});
}

const insert_message = (nome, email,senha) =>{
    db_connect();
    var sql = 
    "INSERT INTO `mensagem`(`id`, `nome`, `email`, `senha`, `status`) VALUES (null,'"+nome+"','"+email+"','"+senha+"',1)";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Mensagem adicionada!");
    connection.end();
});
}

function select_all_messages(){
    var messages ="";
    db_connect();
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM mensagem", function (err, result, fields) {
        if (err)  return reject(err);
        resolve(result);
        //console.log(message);
        });
        connection.end();
});
}

/*select_message("admin", "admin").then(function(result){
   message = result; //console.log(message[0]["nome"]);
}).catch(function(err){
    console.log(err);
});
setTimeout(() => {
    console.log(message);
}, 500);
*/
//nsert_message("Pedro", "ok@live.com","admin");
//update_message(2,"Telvis","122");
//delete_message(2)
/*
var messages="";
select_all_messages().then(function(result){
   messages = result;
 }).catch(function(err){
     console.log(err);
 });
 setTimeout(() => {
      console.log(messages);

 }, 500);
 
 */