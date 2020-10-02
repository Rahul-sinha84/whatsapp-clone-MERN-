import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
const PORT = process.env.PORT || 9000;
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/typeDefs";
import "./database/realtime_database";
const app = express();
//for middleware
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:5uOLoWFfvQOOrxhF@server-data.leyud.mongodb.net/Whatsapp-MERN-severSide?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
