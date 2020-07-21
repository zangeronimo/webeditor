import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema', 'index.graphql'),
  resolvers,
  context: ({ request, response }) => ({ req: request, res: response }),
});

server.start();