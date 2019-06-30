/* eslint-disable camelcase */
const csv = require('fast-csv');
const Joi = require('@hapi/joi');
const path = require('path');
const assert = require('assert');
const { csvFile } = require('../config');
const { apartmentSchema } = require('../schemas/request-schema');

describe('CSV Sanity Logic', async () => {
  it('Check sanity for failed csv fields', () => {
    const csvPath = path.join(__dirname, '../data/invalid_csv.csv');
    let validationFailed = false;
    csv.parseFile(csvPath, { headers: true })
      .on('data', (record) => {
        const { error } = Joi.validate(record, apartmentSchema);
        if (error) {
          validationFailed = true;
        }
      }).on('end', () => {
        if (validationFailed) assert(true);
        else assert(false);
      }).on('error', (err) => {
        console.log(err);
      });
  });

  it('Check sanity for csv fields', () => {
    const csvPath = path.join(__dirname, `../data/${csvFile}.csv`);
    let validationFailed = false;
    csv.parseFile(csvPath, { headers: true })
      .on('data', (record) => {
        const { error } = Joi.validate(record, apartmentSchema);
        if (error) {
          console.log('Error in schema for', error);
          validationFailed = true;
        }
      }).on('end', () => {
        if (validationFailed) assert(false);
        else assert(true);
      }).on('error', (err) => {
        console.log('Error in csv sanity validation ', err);
        assert(false);
      });
  });

  it('Check if all apartment-id are unique', (done) => {
    const apartmentIds = {};
    const csvPath = path.join(__dirname, `../data/${csvFile}.csv`);
    csv.fromPath(csvPath, { headers: true })
      .on('data', (record) => {
        const { apartment_id } = record;
        if (apartment_id in apartmentIds) {
          assert(false);
          done();
        }
      })
      .on('error', (err) => {
        console.log('Found error in reading csv file', err);
        assert(false);
      })
      .on('end', () => {
        assert(true);
        done();
      });
  });

  it('Pass for duplicate apartment-id', (done) => {
    const apartmentIds = {};
    let duplicateId = false;
    const csvPath = path.join(__dirname, '../data/duplicate.csv');
    csv.parseFile(csvPath, { headers: true })
      .on('data', (record) => {
        const { apartment_id } = record;
        if (apartment_id in apartmentIds) {
          duplicateId = true;
        }
        apartmentIds[apartment_id] = true;
      })
      .on('error', (err) => {
        console.log('Found error in reading csv file', err);
        assert(false);
        done();
      })
      .on('end', () => {
        if (duplicateId) assert(true);
        else assert(false);
        done();
      });
  });
});
