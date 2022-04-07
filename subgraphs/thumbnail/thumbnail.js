const {ApolloServer, gql} = require("apollo-server");
const {buildFederatedSchema} = require("@apollo/federation");

const typeDefs = gql`
    type Thumbnail @key(fields: "id") {
        id: String!
        type: String!
    }
`;

const resolvers = {
    Thumbnail: {
        __resolveReference(object) {
            return {type: "test", id: object.id};
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
