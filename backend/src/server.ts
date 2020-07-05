import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import resolvers from './resolvers/resolvers'

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema', 'schema.graphql'),
  resolvers
});

server.start();