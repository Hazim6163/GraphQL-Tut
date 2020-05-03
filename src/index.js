const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API of a Hacker news Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        deleteLink(root, args, context) {
            return context.prisma.deleteLink({
                id: args.id
            })
        },
        updateLink(root, args, context) {
            return context.prisma.updateLink({
                data: {
                    url: args.url,
                    description: args.description
                },
                where: { id: args.id }
            })
        }
    },
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // access the request and prisma from the context obj
    context: request => {
        return {
            ...request,
            prisma
        }
    },
})

server.start(() => {
    console.log('server is running on http://localhost:4000');
})