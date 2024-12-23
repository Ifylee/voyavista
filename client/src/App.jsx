import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GlobalStateProvider } from "./utils/GlobalState";
// This will create the endpoint to graphql to make a request to the backend
const httpLink = createHttpLink({
  uri: "/graphql",
});

// This will take the current token, if there is any, and create a header to send
// to the backend to verify if the token is valid
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// This will be the link that will be sent to the backend
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* This provides global state that will be avaiable to all components */}
      <GlobalStateProvider>
        <Nav />
        <Outlet />
      </GlobalStateProvider>
    </ApolloProvider>
  );
}

export default App;
