export const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      if (context.session) {
        return context.session.user;
      }

      return null;
    },
  },
};
