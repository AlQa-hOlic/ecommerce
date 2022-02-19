import productData from "../prisma/productData.json";

export const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      if (context.session) {
        return context.session.user;
      }

      return null;
    },
    products: async (parent, args, context, info) => {
      const { filter, skip, take } = args;

      let data = productData;

      if (filter) {
        data = data.filter((t) => t.name.includes(filter));
      }

      if (skip) {
        data = data.slice(skip);
      }

      if (take) {
        data = data.slice(0, take);
      }

      return data;
    },
  },
  Product: {
    isWishlisted: async (parent, args, context, info) => {
      if (context.session) {
        return true;
      }

      throw new Error("You must be authenticated to access wishlist!");
    },
  },
};
