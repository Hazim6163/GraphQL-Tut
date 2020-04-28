const {GraphQLServer} = require('graphql-yoga');

const links = [
    {id:'link-0', des: 'some random link', url: 'www.google.com'}
]

let id = links.length;

const resolvers = {
    Query: {
      info: () => `Hello World`,
      feed: () => links
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${id++}`,
                des: args.des,
                url: args.url
            }
            links.push(link);
            return link;
        }
    }
}
  

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log('server is running on http://localhost:4000');
})