const { GraphQLServer } = require('graphql-yoga');

const links = [
    { id: 'link-0', des: 'Google', url: 'www.google.com' },
    { id: 'link-1', des: 'facebook', url: 'www.facebook.com' }
]

let id = links.length;

const resolvers = {
    Query: {
        info: () => `Hello World`,
        feed: () => links,
        link: (parent, args) => {
            const link = links.find(e => {
                return e.id === args.id
            })
            return link;
        }
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
        },
        updateLink: (parent, args) => {
            const link = links.find(e => e.id === args.id);
            link.des = args.des;
            link.url = args.url;
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