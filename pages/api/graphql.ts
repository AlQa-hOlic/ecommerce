import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = { hello: () => "Hello world!" };

const graphqlHandler = async (req, res) => {
  const source = req.body.query;
  const response = await graphql({
    schema,
    source,
    rootValue,
  });

  return res.end(JSON.stringify(response));
};

export default graphqlHandler;
