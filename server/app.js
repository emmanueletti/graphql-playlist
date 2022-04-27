const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const PORT = 3000;

// graphql is set up as an express middleware with an endpoint that acts as a supercharged entry
// point for all graph ql requests
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
