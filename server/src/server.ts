import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server";

const schema = fs.readFileSync(path.join(__dirname, "../schema.graphql"), "utf-8");

const typeDefs = gql`${schema}`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
});

server.listen(4000).then(({ url }) => console.log(`Server ready ad ${url} .`));
