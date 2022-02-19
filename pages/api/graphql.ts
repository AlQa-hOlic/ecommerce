import { NextApiRequest, NextApiResponse } from "next";
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { getSession } from "next-auth/react";

import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "editor.theme": "light",
        "request.credentials": "include",
      },
    }),
  ],
  context: async ({ req }) => {
    const session = await getSession({ req });
    return { session };
  },
});
const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
