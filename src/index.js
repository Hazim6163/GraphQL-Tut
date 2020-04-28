const {GraphQLServer} = require('graphql-yoga');

const links = [
    {id: 1, des: 'some random link', url: 'www.google.com'}
]

const resolvers = {
    Query: {
      info: () => `Hello World`,
      feed: () => links
    }
}
  

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers
})

server.start(() => {
    console.log('server is running on http://localhost:4000');
})