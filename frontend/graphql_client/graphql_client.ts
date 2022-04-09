import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const link = createHttpLink({
    credentials: 'same-origin',
    headers: {'X-CSRF-Token': csrfToken},
    uri: '/graphql'
})
const graphQLClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

export default graphQLClient;