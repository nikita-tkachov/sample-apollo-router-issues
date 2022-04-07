const {ApolloServer, gql} = require("apollo-server");
const {buildFederatedSchema} = require("@apollo/federation");

const typeDefs = gql`

    extend type Thumbnail @key(fields: "id") {
        id: String! @external
    }

    type Club @key(fields: "id") {
        id: String!
        thumbnail: Thumbnail
    }

    type ClubEdge {
        node: Club!
    }

    type ClubConnection {
        edges: [ClubEdge!]!
    }

    extend type Query {
        clubs: ClubConnection!
    }
`;

const resolvers = {
    Query: {
        clubs(_, args) {
            return {
                edges: [
                    {
                        node: {
                            id: "1234",
                            thumbnail: null
                        },
                    },
                    {
                        node: {
                            id: "123456",
                            thumbnail: null
                        },
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
