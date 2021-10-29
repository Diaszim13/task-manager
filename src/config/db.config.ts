const {Client} = require("pg");
const dotenv = require('dotenv')

dotenv.config();

var connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'task-manager-dev',
    password: '132465',
    port: 5432
});
connection.connect((err: any) => {
       try {
        if(err) throw err;

        console.log('Database conectou ');
    }catch (Exception) {
        console.log(Exception);
    } 
})

//coneccao para mysql
// var connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'finance-manage-dev',
//     user: 'postgres',
//     password: '132465'
// })

// //database
// connection.connect((err: any) => {
//     try {
//         if(err) throw err;

//         console.log('Database conectou ' + connection.threadId);
//     }catch (Exception) {
//         console.log(Exception);
//     } 
// })

module.exports = connection;