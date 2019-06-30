/* eslint-disable camelcase */
/* eslint linebreak-style: ["error", "windows"] */
const schema = {};
schema.graphqlBuildString = `
    type Apartment {
    apartment_id: String!
    zip_code: String!
    apartment_type: String!
    apartment_size: Int!
    rent: Int!
    deleted: Boolean!
  }

  type RootQuery {
    rents(zip_code:Int!, apartment_size: Int!): [Apartment]
  }

  schema {
    query: RootQuery
  }
`;

module.exports = schema;
