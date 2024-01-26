require("dotenv").config()

//connect
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    pool: { min: 0, max: 7 }
});
//check
knex.raw('SELECT VERSION()').then(() => {
    console.log('connection to db successfully');
});

module.exports=knex;