/* eslint-disable camelcase */
/* eslint linebreak-style: ["error", "windows"] */
const pg = require('pg');
const appConfig = require('./config.json');

// create a config to configure both pooling behavior
const config = {
  user: appConfig.databaseCreds.user,
  database: appConfig.databaseCreds.database,
  password: appConfig.databaseCreds.password,
  host: appConfig.databaseCreds.host,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const testConfig = {
  user: appConfig.databaseCreds.user,
  database: appConfig.databaseCreds.database,
  password: appConfig.databaseCreds.password,
  host: appConfig.databaseCreds.host,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

// this initializes a connection pool
// it will keep idle connections open for 30 seconds
const pool = new pg.Pool(config);
const testPool = new pg.Pool(testConfig);


// if an error is encountered by a client while it sits idle in the pool
// the pool itself will emit an error event with both the error and
pool.on('error', (err) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.pool = pool;

// export the query method for passing queries to the pool
module.exports.query = (text, values, callback) => {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = callback => pool.connect(callback);
module.exports.connectTest = callback => testPool.connect(callback);
