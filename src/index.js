const {GraphQLServer} = require('graphql-yoga');

const resolvers = {
    Query: {
      info: () => `Hello World`
    }
}
  

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers
})

server.start(() => {
    console.log('server is running on http://localhost:4000');
})