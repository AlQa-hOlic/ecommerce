import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    me: User
    products(filter: String, skip: Int, take: Int): [Product!]!
    wishlist(skip: Int, take: Int): [Product!]!
  }

  type Mutation {
    logout: Boolean
    toggleWishlistItem(id: String!): Boolean
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

  type Product {
    id: String
    name: String
    sku: String
    imageUrl: String
    isWishlisted: Boolean
    price: Float
  }
`;
