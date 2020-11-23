// var knex = require('knex')({
//     client: 'mysql2',
//     connection: {
//       host : 'weknow.cqeueigzxw1e.us-east-2.rds.amazonaws.com',
//       user : 'admin',
//       password: 'Facens2020',
//       database : 'weknow'
//     }
//   });



var knex = require('knex')({
  client: 'mysql2',
  connection: {
    // host: '127.0.0.1',
    //host: 'localhost',
    host: 'us-cdbr-east-02.cleardb.com',
    // user: 'root',
    user: 'b4448815ba402c',
    password: '4f7be66b',
    // password: 'root',
    // password: '1234',
    // password: '',
    database: 'heroku_8e3a79464d4cbff'
  }
});


module.exports = knex