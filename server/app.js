const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = 3000;

// graphql is set up as an express middleware with an endpoint that acts as a supercharged entry
// point for all graph ql requests
app.use('/graphql', graphqlHTTP({}));

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
