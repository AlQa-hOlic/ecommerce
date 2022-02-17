import { buildSchema } from "graphql";

const gql = String.raw;

export const schema = buildSchema(gql`
  type LoginPayload {
    status: Boolean!
    message: String
    token: String
  }

  type User {
    email: String!
    name: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    login(email: String!): LoginPayload
  }
`);
