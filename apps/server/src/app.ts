require("dotenv").config();
import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import http from "http";
import { buildContext, createOnConnect } from "graphql-passport";
import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { buildSchema, } from "type-graphql";

import "./initPassport";
import { router as authRoutes } from "./routes/auth.routes";
import { customAuthChecker } from "./utils/customAuthChecker";
import { userResolver } from "./resolvers/user.resolver";
const PORT = process.env.PORT || 5000;
const SESSION_SECRECT = process.env.SESSION_SECRECT;

export async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production'
  const app = express();
  // const pubsub = new PubSub();
  const sessionMiddleware = cookieSession({
    secure: true,
    name: "qid",
    httpOnly: true,
    sameSite: 'none',
    keys: [process.env.SESSION_SECRECT],
    maxAge: 24 * 60 * 60 * 1000 * 365, // session will expire after 1 year
  });
  !isProduction && app.set('trust proxy', 1);
  const passportMiddleware = passport.initialize();
  const passportSessionMiddleware = passport.session();
  // (app as any).use(cors({
  //   origin: 'https://studio.apollographql.com',
  //   credentials: true
  // }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(passportMiddleware);
  app.use(passportSessionMiddleware);

  app.use("/media", express.static(__dirname + "/public"));
  app.use("/auth", authRoutes);

  const schema = await buildSchema({
    resolvers: [userResolver,],
    emitSchemaFile: "./src/generated/schema.gql",
    authChecker: customAuthChecker,
    // pubSub: pubsub,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res, }) => {
      let context = buildContext({ req, res });
      let currentUser = context.getUser();
      return { ...context, currentUser, req, res, }
    },

    // subscriptions: {
    //   onConnect: createOnConnect([
    //     sessionMiddleware,
    //     passportMiddleware,
    //     passportSessionMiddleware,
    //   ]) as any,
    //   onDisconnect: (webSocket, context) => {
    //     // ...
    //   },
    // },
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "https://studio.apollographql.com",
    },
    path: "/graphql"
  });
  const httpServer = http.createServer(app);
  // server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    // console.log(
    //   `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    // );
  });
}

