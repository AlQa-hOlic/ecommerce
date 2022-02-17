import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";

const App = () => (
  <>
    <GraphiQL
      fetcher={async (graphQLParams) => {
        const data = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(graphQLParams),
          credentials: "same-origin",
        });
        return data.json().catch(() => data.text());
      }}
    />
    <style global={true}>{`
    body {
        padding: 0;
        margin: 0;
        min-height: 100vh;
    }
    #__next {
        height: 100vh;
    }
    `}</style>
  </>
);

export default App;
