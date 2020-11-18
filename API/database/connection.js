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
    //host : '127.0.0.1',
    host: 'localhost',
    user : 'root',
    // password: 'root',
    // password: '1234',
    password: '',
    database : 'weknow'
  }
});


module.exports = knex