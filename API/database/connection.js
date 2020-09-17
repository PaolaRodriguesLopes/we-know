var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      //password : 'root',
      password: '',
      database : 'weknow'
    }
  });

module.exports = knex