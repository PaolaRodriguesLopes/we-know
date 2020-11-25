var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b4448815ba402c',
    password: '4f7be66b',
    database: 'heroku_8e3a79464d4cbff'
  }
});


module.exports = knex