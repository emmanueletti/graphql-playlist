const graphql = require('graphql');

// the schema describes the relationship and shape of our data which tells
// graphql how to move through our data and how each point on of our data connects

// aka this schema file has two functions:
// 1 - to define the shape of our data - "types"
// 2 - to define how our data connects to each other - "relationships"
// 3 - to define the root queries - the points in which requests can jump into
//      our data graph

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
});
