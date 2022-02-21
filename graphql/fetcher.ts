export const gql = String.raw;

export const fetcher = (request) => {
  let requestBody = {
    query: "",
    variables: {},
  };
  if (typeof request === "string") {
    requestBody.query = request;
  } else if (request?.query) {
    requestBody.query = request.query;

    if (request?.variables) {
      requestBody.variables = request.variables;
    }
  }

  return fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then(({ data }) => data);
};
