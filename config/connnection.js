let mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burger_db"
  });

connection.connect((err)=>{
    if (err) {
        console.log(`Error Connecting: ${err.stack}`) // what is err.stack?
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});

module.exports = connection;