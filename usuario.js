
var connection = require("./connection");

var user = "";

const db_connect = (connection) => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Conectado!');
    });
}
//db_connect(connection);


const delete_user = (connection, id) => {

    var sql = "DELETE FROM `usuario` WHERE `id` = " + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Usuario Excluído!");
    });
    connection.end();
}

const update_user = (connection, id, nome, senha) => {

    var sql = "UPDATE `usuario` SET `nome` = '" + nome + "', `senha`='" + senha + "' WHERE `id` = " + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Usuario Atualizado!");
    });
    //connection.end();
}


function select_user(connection, email) {
    var user = "";
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM `usuario` WHERE `email` = '" + email + "'", function (err, result, fields) {
            if (err) return reject(err);
            else if (result.length == 0) reject(null);
            else resolve(result);
            //console.log(user);
        });

    });
    //connection.end();

}


const insert_user = (connection, nome, email, senha, telefone) => {

    var sql =
        "INSERT INTO `usuario`(`id`, `nome`, `email`, `senha`, `status`, `telefone`) VALUES (null,'" + nome + "','" + email + "','" + senha + "',1, '" + telefone + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Usuario adicionado!");
    });
}

const end_connection = (connection) => {
    connection.end();
}

function select_all_users(connection) {
    var users = "";

    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM usuario", function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(user);
        });
    });
    //connection.end();
}

module.exports = {
    db_connect ,
    select_user,
    insert_user,
    update_user,
    delete_user,
    end_connection
}



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

 }, 500);/*
 */
