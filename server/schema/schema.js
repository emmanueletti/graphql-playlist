const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
const _ = require('lodash');

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Drama', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
  { name: 'Redwall', genre: 'Fantasy', id: '4' },
];
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
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // fields of root queries dont need a function value for the fields key
  fields: {
    // first root query is for a single book, the naming of the key is very important
    // graphQL will interpolate the name we give into the resulting db requests it makes
    book: {
      type: BookType,
      // define the arguements that the front end needs to pass along with this root request
      // args: { id: { type: GraphQLString } }, // args object that will be passed into the resolve function
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // resolve function is to get data from db / other source
        // the function fires when a request to this "book" query is received
        // args param gives us access to any args passed in by the user e.g args.id
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
