import { graphql } from "graphql";
import { rootValue, schema } from "../../graphql";

const graphqlHandler = async (req, res) => {
  const source = req.body.query;
  const variableValues = req.body.variables;
  const response = await graphql({
    schema,
    source,
    variableValues,
    rootValue,
  });

  return res.end(JSON.stringify(response));
};

export default graphqlHandler;
