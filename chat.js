
//var connection = require("./connection");

var chat = "";

const db_connect = (connection) => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Conectado!');
    });
}
//db_connect(connection);


const delete_chat = (connection, id) => {

    var sql = "DELETE FROM `tb_chats` WHERE `chatID`=" + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Chat Excluído!");
    });
    //connection.end();
}
/*
const update_chat = (id, nome, senha)=>{

    var sql = "UPDATE `tb_chats` SET `nome` = '"+nome+"', `senha`='"+senha+"' WHERE `id` = "+id+"";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Chat Atualizado!");
}); 
  //connection.end();
}

*/
function select_chat(connection, chatID) {
    var chat = "";
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM `tb_chats` WHERE `chatID` = '" + chatID + "'", function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(chat);
        });

    });
    //connection.end();

}

const validate_duplicate = (connection, userIID, userIIID) => {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT `chatID`, `chatCreatedAt`, `nome` FROM `tb_chats` INNER JOIN `usuario` on `id` = `userIID` or `id` = `userIIID` "+
        "WHERE `id` = "+userIIID+"   AND `userIID` = " + userIID + " AND `userIIID` = " + userIIID +
        " or `userIID` = " + userIIID + " AND `userIIID` = " + userIID, function (err, result, fields) {
                if (err) return reject(err);
                else if (result.length != 0) reject(result);
                else resolve(result);
            });
    });
}

const insert_chat = (connection, userIID, userIIID) => {
    var date = "now()";
    var sql =
        "INSERT INTO `tb_chats`(`chatID`, `userIID`, `userIIID`, `chatCreatedAt`, `chatUpdatedAt`, `chatLastMessageReceivedAt`,`chatLastMessageSentAt`, `chatLastMessageId`) VALUES (NULL," + userIID + "," + userIIID + "," + date + "," + date + "," + date + "," + date + ",0)";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.log("Chat adicionado!");
    });
}



const end_connection = (connection) => {
    connection.end();
}

function select_all_chats(connection, userIID) {
    var chats = "";

    return new Promise(function (resolve, reject) {
        connection.query("SELECT chatID FROM `tb_chats` WHERE `userIID` = '" + userIID + "' or `userIIID` = '" + userIID + "'", function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(chat);
        });
    });
    //connection.end();

}

function select_all_chats_from(connection, id, chatID) {
    var chats = "";

    return new Promise(function (resolve, reject) {
        connection.query("SELECT nome, id, (SELECT "+chatID+") AS chatID from usuario where id = (SELECT userIIID FROM `tb_chats` WHERE chatID = "
        +chatID+" AND userIID = "+id+") or id = (SELECT userIID FROM `tb_chats` WHERE chatID = "+chatID+" and userIIID = "+id+")", function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(chat);
        });
    });
    //connection.end();

}


//var chats = insert_chat(9, 11);

//console.log(chats);

//delete_chat(2);
//delete_chat(3);
/*
var chats;
select_all_chats(9).then(function (result) {
    chats = result;
    console.log(chats);
}).catch(function (err) {
    console.log(err);
});
//console.log(chats);
 /* 
var chat;
chat = select_chat(2).then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});
//console.log(chat);

validate_duplicate(11,10).then(function(result){
     chats = result;
    console.log("sem chats");
    insert_chat(11,10);
}).catch(function(err){
    chats = err;
    console.log("Tem este chat");
    console.log(chats)
});
 */

module.exports = {
   
    select_chat,
    insert_chat,
    /*update_ch/at,*/
    delete_chat,
    end_connection,
    select_all_chats,
    select_all_chats_from
}


