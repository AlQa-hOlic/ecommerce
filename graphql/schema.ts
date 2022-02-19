import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    logout: Boolean
  }

  type User {
    email: String
    name: String
    image: String
    role: Role
  }

  enum Role {
    USER
    ADMIN
  }
`;
