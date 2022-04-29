const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// dummy data
// const books = [
//   { name: 'Name of the Wind', genre: 'Drama', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// const authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' },
// ];

// the schema describes the relationship and shape of our data which tells
// graphql how to move through our data and how each point on of our data connects

// aka this schema file has two functions:
// 1 - to define the shape of our data - "types"
// 2 - to define how our data connects to each other - "relationships"
// 3 - to define the root queries - the points in which front end requests can jump into
//      our data graph

// defines shape of the graphql data
// think of this as a model in Rails
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // id: { type: GraphQLString }, // type uses maybe graphQL enums to describe the datatype of each field
    id: { type: GraphQLID }, // using the graphql type id for increased flexibility, id can now be sent in the request as an int or string
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //  console.log(parent)
        // parent is equal to the result of the initial request
        // this is how you model your join relationships with graphql
        // return _.find(authors, { id: parent.authorId }); // lodash syntax - resolving our data locally from dummy data arrays
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, // using the graphql type id for increased flexibility, id can now be sent in the request as an int or string
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      // definition of the nested relationship between author and thier book(s)
      // type: BookType // this does not work here because author can be related to many books not just a single book
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //   return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // fields of root queries dont need a function value for the fields key
  fields: {
    // first root query is for a single book, the naming of the key is very important
    // graphQL will interpolate the name we give into the resulting db requests it makes
    // query for a particular book
    book: {
      type: BookType,
      // define the arguements that the front end needs to pass along with this root request
      // args: { id: { type: GraphQLString } }, // args object that will be passed into the resolve function
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // resolve function is to get data from db / other source
        // the function fires when a request to this "book" query is received
        // args param gives us access to any args passed in by the user e.g args.id
        //   return _.find(books, { id: args.id }); // using lodash and a mock array data array as a mock db
      },
    },

    // query for a particlular author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   return _.find(authors, { id: args.id });
      },
    },

    // query for a list of books
    books: {
      type: GraphQLList(BookType),
      // resolve(parent, args) {
      //   return books;
      // },
    },

    // query for a list of authors
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        //   return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
