require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose'); // mongoose is an ORM a là Rails ActiveRecord

const app = express();
const PORT = 3000;

// connect to mongoDb
mongoose.connect(
  `mongodb+srv://emmanuel:${process.env.DB_PASS}@graphql-tutorial.dbn2q.mongodb.net/graphql-tutorial?retryWrites=true&w=majority`
);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// graphql is set up as an express middleware with an endpoint that acts as a supercharged entry
// point for all graph ql requests
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
