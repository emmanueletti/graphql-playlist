import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Components
import BookList from './components/BookList';

const SERVER_PORT = 3000;

// Apollo client setup
const client = new ApolloClient({
  uri: `https://localhost:${SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
