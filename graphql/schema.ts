import { buildSchema } from "graphql";

const gql = String.raw;

export const schema = buildSchema(gql`
  type User {
    email: String!
    name: String
  }

  type Query {
    me: User!
  }
`);
