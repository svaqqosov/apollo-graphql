const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const axios = require('axios');

// The GraphQL schema in string form
const typeDefs = `
  type Query { posts: [Post] }
  type Post { id: String, title: String, url: String, author: String, ups: Int, down: Int, content: String }
`;

const resolvers = {
  Query: {
    posts: () => axios.get('https://www.reddit.com/r/javascript.json')
      .then((response) => {
        const __posts = [];
        const posts = response.data.data.children;

        posts.map((post) => {
          post.data.content = post.data.selftext_html;
          __posts.push(post.data);
        });
        return __posts;
      })
      .catch(error => ({ error }))
  }
};
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = app;
