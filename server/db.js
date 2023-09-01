const Pool = require("pg").Pool

const Pool = new Pool({
user: "postgres",
password: "5150",
host: "localhost",
port: 5432,
database: "m2recipe"
});

module.exports = Pool;