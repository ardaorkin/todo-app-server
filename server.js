import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import generateTodoModel from "./schema/models";
import dbConnection from "./db/connection";
import cors from "cors";
import validateUser from "./controllers/validateUser";
const startApolloServer = async () => {
  await dbConnection()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: { path: "/subscriptions" },
    context: async ({ req }) => {
      const username = req?.headers?.username;
      const password = req?.headers?.password;

      const user = await validateUser({ username, password }).then(
        (result) => result
      );

      return {
        user,
        models: {
          Todo: generateTodoModel({ user }),
        },
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send("Welcome Todo App");
    res.end();
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `🚀 Subscriptions ready at http://localhost:4000${server.subscriptionsPath}`
  );
  return { server, app };
};

startApolloServer();
