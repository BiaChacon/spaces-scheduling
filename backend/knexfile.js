// Update with your config settings.

module.exports = {

  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './src/database/db.sqlite'
    // },
    // migrations: {
    //   directory: './src/database/migrations'
    // },
    // useNullAsDefault: true,
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations:{
      directory: __dirname + '/src/database/migrations',
    },
    seeds: {
      directory: __dirname + '/src/database/seeds',
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
