const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

/*
  With GraphQL and Express, there will only be one endpoint,
  which will be /graphql. This will provide access to the
  schema.
*/
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Application listening on port', PORT);
});
