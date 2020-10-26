var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'weknow.cqeueigzxw1e.us-east-2.rds.amazonaws.com',
      user : 'admin',
      password: 'Facens2020',
      database : 'weknow'
    }
  });

module.exports = knex