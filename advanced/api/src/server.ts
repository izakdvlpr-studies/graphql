import "dotenv/config";
import "reflect-metadata";

import { ApolloServer } from "apollo-server";

import "./database/connect";

import schema from "./schemas";

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const context = {
      req,
      token: req.headers.authorization,
    };

    return context;
  },
});

server.listen({ port: 4000 }, () =>
  console.log("Server is running on port 4000")
);
