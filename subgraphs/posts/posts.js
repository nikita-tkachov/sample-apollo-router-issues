const {ApolloServer, gql} = require("apollo-server");
const {buildFederatedSchema} = require("@apollo/federation");

const typeDefs = gql`

    extend type Club @key(fields: "id") {
        id: String! @external
        posts: PostConnection!
    }

    type Post @key(fields: "id") {
        id: String!
    }

    type PostEdge {
        node: Post!
    }

    type PostConnection {
        edges: [PostEdge!]!
    }
`;

const resolvers = {
    Club: {
        posts(_, args) {
            return {
                edges: [
                    {
                        node: {
                            id: "512",
                        }
                    },
                    {
                        node: {
                            id: "4251",
                        }
                    }
                ]
            };
        }
    },
};

const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs,
            resolvers
        }
    ])
});

server.listen({port: 4000}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
