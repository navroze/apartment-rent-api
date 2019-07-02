/**
 * Module dependencies.
 */
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const logger = require('morgan');
const chalk = require('chalk');
const { rentResolver } = require('./resolvers');
const { graphqlBuildString } = require('./schemas/graphql-schema');
const config = require('./config.json');

/**
 * Create Express server.
 */
const app = express();


/**
 * Graphql configuration.
 */
const resolvers = {
  rents: rentResolver
};
app.use('/graphql', graphqlHttp({
  schema: buildSchema(graphqlBuildString),
  rootValue: resolvers,
  graphiql: true
}));


/**
 * Set server configurations and logger.
 */
app.set('host', config.serverConfig.serverIp);
app.set('port', config.serverConfig.serverPort);
app.use(logger('dev'));

/**
 * Set root route.
 */
app.get('/', (req, res) => {
  res.send('Head over to localhost:3000/graphql for using the service');
});

/**
 * Start express server
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
