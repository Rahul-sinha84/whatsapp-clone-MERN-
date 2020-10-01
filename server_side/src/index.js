import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
const PORT = process.env.PORT || 9000;
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/typeDefs";
const app = express();
//for middleware
app.use(express.json());

mongoose.connect("mongodb://localhost/whatsapp_clone", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
