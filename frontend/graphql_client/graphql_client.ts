import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";

let uri: string

if (process.env.NODE_ENV == "production") {
    uri = "https://really-smart.herokuapp.com";
} else {
    uri = "http://localhost:3000/graphql";
}
const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
export const graphqlClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    credentials: 'same-origin',
    headers: {
        'X-CSRF-Token': csrfToken
    },
    uri: uri
});