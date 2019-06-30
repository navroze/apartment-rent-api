const winston = require('winston');
const pool = require('../pgdb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logging/rent_api.log' })
  ]
});

const resolver = {};

/**
 * Resolver for getting apartment rents
 */
resolver.rentResolver = async (args) => {
  const client = await pool.connect();
  try {
    logger.log({
      level: 'info',
      message: {
        info: 'request from client',
        query: args
      }
    });
    const rentQuery = 'SELECT * FROM rents where apartment_size = $1 AND zip_code= $2';
    const rentSelectQuery = [args.apartment_size, args.zip_code];
    const res = await client.query(rentQuery, rentSelectQuery);
    return res.rows;
  } catch (error) {
    console.log('Error in rent resolver', error);
  } finally {
    client.release();
  }
};

module.exports = resolver;
