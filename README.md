# Apollo-grphQL
This is an example for using Apollo GraphQl server.

### Prerequisites
 - Nodejs

This project intended to build a GraphQL application that queries Subreddits and display its posts. It uses Reddit api in order to suply api with some json data. You can replase json source as you want.

Installation

Clone the repo, install the dependencies.

```sh
$ git clone git@github.com:svaqqosov/apollo-graphql.git
$ cd apollo-graphql
$ npm install
$ node run server.js
```



Open http://127.0.0.1:3000 in your brouser and enter the following:

```sh
{
  posts{
    id
    title
    url
    ups
    author
  }
}
```
