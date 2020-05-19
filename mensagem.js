//var connection = require("./connection");

var message = "";

const db_connect = (connection) => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Conectado!');
    });
}


const delete_message = (connection,id) => {
    
    var sql = "DELETE FROM `message` WHERE `id` = " + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("message Excluída!");
        //connection\.end\(\);
    });
}

const update_message = (connection, id, nome, senha) => {
    
    var sql = "UPDATE `message` SET `nome` = '" + nome + "', `senha`='" + senha + "' WHERE `id` = " + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("message Atualizada!");
        //connection\.end\(\);
    });
}


function select_message(connection,messageID) {
    var message = "";
    
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM message WHERE messageID = " + messageID, function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(message);
        });
        //connection\.end\(\);
    });
}

const insert_message = (connection,messageChatID, messageText, messageSenderID,messageReceiverID) => {
    
    var sql =
        "INSERT INTO `message`(`messageID`, `messageChatID`, `messageText`, `messageSenderID`, `messageReceiverID`, `messageSendAt`, `messageReadAt`, `messageStatustiny`, `messageVisibilitytiny`)"+
         "VALUES (null," + messageChatID + ",'" + messageText + "',"+messageSenderID+","+messageReceiverID+", now(),now(),1,1)";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("message adicionada!");
        //connection\.end\(\);
    });
}

function select_all_messages(connection,messageChatID) {
    var messages = "";
    
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM message WHERE messageChatID = "+messageChatID, function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(message);
        });
        //connection\.end\(\);
    });
}

var message;
/*
select_all_messages(6).then(function(result){
   message = result; //console.log(message[0]["nome"]);
}).catch(function(err){
    console.log(err);
});
setTimeout(() => {
    console.log(message);
}, 500);
*/
//insert_message(6, "Beleza então", 9,10); 
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
module.exports = {
    select_message,
    select_all_messages,
    insert_message
}