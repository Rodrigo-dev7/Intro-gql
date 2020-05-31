const { ApolloServer, gql  } = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obert informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID


const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {_id: String(Math.random()), name: 'Bill', email:'bill@test.com', active: true},
  {_id: String(Math.random()), name: 'Bill2', email:'bill@test2.com', active: true},
  {_id: String(Math.random()), name: 'Bill3', email:'bill@test3.com', active: true},
];

const resolvers = {
  Query: {
    hello: () => 'Hello world',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find(user => user.email === args.email)
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`:D Server started at ${url}`));

