const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const creatApartment = require('./test-helper');

describe('Graphql', () => {
  it('should get http response 200 and Appartment with id = ee2ba37d-0b10-4db5-9fa9-53e083aa7067', async () => {
    const graphqlQuery = `{
        rents(zip_code: 10365, apartment_size: 136) {
          apartment_id
          apartment_size
          zip_code
          rent
          deleted
        }
      }
    `;
    const query = JSON.stringify({ query: graphqlQuery });
    try {
      await creatApartment();
      await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(query)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          assert(body.data.rents[0].apartment_id === 'ee2ba37d-0b10-4db5-9fa9-53e083aa7067');
        });
    } catch (error) {
      console.log(error);
      assert(false);
    }
  });

  it('get http response 200 and empty array with zip code not present in db', async () => {
    const graphqlQuery = `{
        rents(zip_code: 10365, apartment_size: 136) {
          apartment_id
          apartment_size
          zip_code
          rent
          deleted
        }
      }
    `;
    const query = JSON.stringify({ query: graphqlQuery });
    try {
      await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(query)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          assert(body.data.rents.length === 0);
        });
    } catch (error) {
      console.log(error);
      assert(false);
    }
  });

  it('get http response 200 and empty array with apartment_size not present in db', async () => {
    const graphqlQuery = `{
        rents(zip_code: 10365, apartment_size: 1360) {
          apartment_id
          apartment_size
          zip_code
          rent
          deleted
        }
      }
    `;
    const query = JSON.stringify({ query: graphqlQuery });
    try {
      await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(query)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          assert(body.data.rents.length === 0);
        });
    } catch (error) {
      console.log(error);
      assert(false);
    }
  });
});
