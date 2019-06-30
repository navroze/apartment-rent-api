// /* eslint linebreak-style: ["error", "windows"] */
const pool = require('../pgdb');

beforeEach(async () => {
  try {
    const client = await pool.connectTest();
    const truncateQuery = 'TRUNCATE rents';
    await client.query(truncateQuery);
  } catch (error) {
    console.log('Error found in connecting to rent_db_test', error);
  }
});

const creatApartment = async () => {
  const client = await pool.connectTest();
  const createQuery = `INSERT INTO rents(apartment_id, zip_code, apartment_type, apartment_size, rent, deleted) 
    VALUES($1, $2, $3, $4, $5, $6)`;
  const selectQuery = ['ee2ba37d-0b10-4db5-9fa9-53e083aa7067', '10365', 'basement', '136', '1360', 'false'];
  await client.query(createQuery, selectQuery);
};

module.exports = creatApartment;
