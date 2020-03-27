
var connection = require("./connection");

var user ="";

const db_connect = (connection)=>{
    connection.connect(function(err){
        if (err) throw err;
        console.log('Conectado!');
    });
}
db_connect(connection);


const delete_user = (connection, id)=>{
    db_connect(connection);
    var sql = "DELETE FROM `usuario` WHERE `id` = "+id+"";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Usuario Excluído!");
    connection.end();
});
}

const update_user = (id, nome, senha)=>{
    db_connect(connection);
    var sql = "UPDATE `usuario` SET `nome` = '"+nome+"', `senha`='"+senha+"' WHERE `id` = "+id+"";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Usuario Atualizado!");
    connection.end();
});
}


function select_user(email, senha){
    var user ="";
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM usuario WHERE email = '"+email+"' AND senha = '"+senha+"'", function (err, result, fields) {
        if (err)  return reject(err);
        resolve(result);
        //console.log(user);
        });

});
connection.end();

}


const insert_user = (connection, nome, email,senha) =>{
    db_connect(connection);
    var sql = 
    "INSERT INTO `usuario`(`id`, `nome`, `email`, `senha`, `status`) VALUES (null,'"+nome+"','"+email+"','"+senha+"',1)";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Usuario adicionado!");
    connection.end();
});
}


function select_all_users(connection){
    var users ="";
    db_connect(connection);
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM usuario", function (err, result, fields) {
        if (err)  return reject(err);
        resolve(result);
        //console.log(user);
        });
        connection.end();
});
}

module.exports = select_user;



/*
select_user("admin", "admin").then(function(result){
   user = result; //console.log(user[0]["nome"]);
}).catch(function(err){
    console.log(err);
});
setTimeout(() => {
    console.log(user);
}, 500);
*/
//nsert_user("Pedro", "ok@live.com","admin");
//update_user(2,"Telvis","122");
//delete_user(2)
/*
var users="";
select_all_users().then(function(result){
   users = result;
 }).catch(function(err){
     console.log(err);
 });
 setTimeout(() => {
      console.log(users);

 }, 500);
 */
