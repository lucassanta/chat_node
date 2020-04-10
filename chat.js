
var connection = require("./connection");

var chat = "";

const db_connect = (connection) => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Conectado!');
    });
}
db_connect(connection);


const delete_chat = (id) => {

    var sql = "DELETE FROM `tb_chats` WHERE `chatID`=" + id + "";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Chat Excluído!");
    });
    connection.end();
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
function select_chat(chatID) {
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

const validate_duplicate = (userIID, userIIID) => {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT chatID FROM `tb_chats` WHERE `userIID` = " + userIID + " AND `userIIID` = " + userIIID +
            " or `userIID` = " + userIIID + " AND `userIIID` = " + userIID, function (err, result, fields) {
                if (err) return reject(err);    
                resolve(result);
            });
    });
}

const insert_chat = (userIID, userIIID) => {
    var date = "now()";
    var ret = "";
    validate_duplicate(userIID, userIIID).then(function (result) {
        //console.log(result);
        if(result.length==0){
            var sql =
                "INSERT INTO `tb_chats`(`chatID`, `userIID`, `userIIID`, `chatCreatedAt`, `chatUpdatedAt`, `chatLastMessageReceivedAt`,`chatLastMessageSentAt`, `chatLastMessageId`) VALUES (NULL," + userIID + "," + userIIID + "," + date + "," + date + "," + date + "," + date + ",0)";
            connection.query(sql, function (err, res) {
                if (err) throw err;
                console.log("Chat adicionado!");
            });
        }
        ret = result; 
    }).catch(function (err) {
        console.log(err);
    });
    return ret;
}



const end_connection = () => {
    connection.end();
}

function select_all_chats(userIID) {
    var chats = "";

    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM tb_chats where userIID = " + userIID + " or userIIID = " + userIID, function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
            //console.log(chat);
        });
    });
    //connection.end();

}

var chats = insert_chat(9, 11);

console.log(chats);

/*
var chats;

validate_duplicate(9,11).then(function(result){
     chats = result;

    console.log(chats);
}).catch(function(err){
    console.log(err)
});
*/

module.exports = {
    select_chat,
    insert_chat,
    /*update_ch/at,*/
    delete_chat,
    end_connection
}


