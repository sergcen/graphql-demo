'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const readFileSync = require('fs').readFileSync;
const resolvers = require('./resolvers');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const schema = makeExecutableSchema({
    typeDefs: readFileSync('./schema.graphqls', 'utf-8'),
    resolvers
});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
