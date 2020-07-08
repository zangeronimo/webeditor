const { dbconfig } = require("./.env")

module.exports = {
  client: dbconfig.client,
  connection: {
    database: dbconfig.database,
    user: dbconfig.user,
    password: dbconfig.password
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
