require('dotenv').config()
import context from './config/ctx';
import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema', 'index.graphql'),
  resolvers,
  context
});

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.WEB_URL]
    },
  }
);