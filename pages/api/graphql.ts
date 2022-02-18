import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
