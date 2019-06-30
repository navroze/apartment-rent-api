/* eslint-disable camelcase */
/* eslint linebreak-style: ["error", "windows"] */
const csv = require('fast-csv');
const path = require('path');
const schedule = require('node-schedule');
const readline = require('readline');
const { cronConfig: { weeklyCron }, csvFile } = require('./config');
const pool = require('./pgdb');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startDump() {
  console.log('Starting POSTGRESQL dump at:', new Date());
  pool.connect((err) => {
    if (err) {
      console.log(err);
    }
  });

  const csvPath = path.join(__dirname, `/data/${csvFile}.csv`);
  csv.parseFile(csvPath, { headers: true })
    .on('data', (record) => {
      const {
        apartment_id,
        zip_code,
        apartment_type,
        apartment_size,
        rent,
        deleted
      } = record;

      const insertQuery = `INSERT INTO rents(apartment_id, zip_code, apartment_type, apartment_size, rent, deleted) 
        VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT (apartment_id) 
                DO
                    UPDATE SET 
                    zip_code = ($2),
                    apartment_type = ($3),
                    apartment_size = ($4),
                    rent = ($5),
                    deleted = ($6)`;

      const values = [apartment_id, zip_code, apartment_type, apartment_size, rent, deleted];

      pool.query(insertQuery, values, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }).on('end', () => {
      console.log('Job is done!');
      console.log('Type Ctrl-C to terminate the job');
    }).on('error', (err) => {
      console.log(err);
    });
}

rl.question('Would you like to run the dump immediately?(Y/N) ', (answer) => {
  if (answer === 'Y' || answer === 'y') {
    startDump();
  } else {
    console.log('Running weekly job in cron mode!');
    schedule.scheduleJob(weeklyCron, () => {
      startDump();
    });
  }
});
