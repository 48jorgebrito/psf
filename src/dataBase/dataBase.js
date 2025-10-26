 
 
 const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '!Brito14522',
    database: 'psf',
  },
});


module.exports = knex 