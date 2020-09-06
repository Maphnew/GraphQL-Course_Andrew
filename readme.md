# The Modern GraphQL Bootcamp (with Node.js and Apollo)

## Section 1:Course Overview

4 / 4|23분

1. Welcome to the Class!
   5분

2. Grab the PDF Guide
   1분

3. Why GraphQL?
   13분

4. Installing Node.js and VSC
   3분

## Section 2:GraphQL Basics: Schemas and Queries

4 / 18|3시간 27분

5. Section Intro: GraphQL Basics:
   Schemas and Queries
   1분

6. What is a Graph?
   6분

7. GraphQL Queries
   13분

8. Nested GraphQL Queries
   12분

9. Setting up Babel
   11분

```shell
# npm init -y
# npm install babel-cli@6.26.0 babel-preset-env@1.7.0
```

- Create /graphql-basics/.babelrc

```json
// .babelrc
{
  "presets": ["env"]
}
```

- Create /graphql-basics/src/indexjs

```javascript
console.log("Hello GraphQL");
```

- Add "start" scripts on package.json

```json
"scripts": {
    "start": "babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

- And then test

```shell
# npm run start
```

```shell
> graphql-basics@1.0.0 start /mnt/d/workspaces/workspaceJS/graphql-course/graphql-basics
> babel-node src/index.js

Hello GraphQL
```

10. ES6 Import/Export
    16분

11. Creating Your Own GraphQL API
    18분

- Install graphql-yoga for nodeJS implement

```shell
# npm i graphql-yoga@1.16.7
```

- Build Type definitions (schema) And Resolvers
- How to Run Server

```javascript
// index.js
import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query!";
    },
    name() {
      return "Maphnew Kim";
    },
    location() {
      return "Ulsan, Korea";
    },
    bio() {
      return "What?";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
```

- Go to http://localhost:4000

12. GraphQL Scalar Types
    13분

- Scalar Types - String, Boolean, Int, Float, ID

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float,
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Maphnew'
        },
        age() {
            return 35
        },
        employed() {
            return true
        },
        gpa() {
            return null
        },
        title() {
            return 'Something'
        },
        price() {
            return 15.20
        },
        releaseYear() {
            return 2019
        },
        rating() {
            return 4.5
        },
        inStock() {
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

13. Live Reload for GraphQL-Yoga
    5분

- install nodemon
- modify scipts 'nodemon src/index.js --exec babel-node'

```json
// package.json
{
  "name": "graphql-basics",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon src/index.js --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "graphql-yoga": "^1.16.7"
  },
  "devDependencies": {
    "nodemon": "^1.19.4"
  }
}
```

14. Creating Custom Types
    15분

- Create User And Poster

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id:'1239884',
                name: 'Mike',
                email: 'mike@example.com',
                age: 35
            }
        },
        post() {
            return {
                id: '1234124',
                title: 'Some title',
                body: 'This is post',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

15. Operation Arguments
    14분

```JS
// index.js
import {
    GraphQLServer
} from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        add(a: Float, b: Float): Float!
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info) {
            console.log(args)
            if (args.a && args.b) {
                return args.a+args.b
            } else {
                return 'Try again'
            }
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello, ${args.name}! You are my favorite ${args.position}`
            } else {
                return 'Hello!'
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on graphql playground

```graphql
query {
  add(a: 1.2, b: 2.3)
  greeting(name: "Jess", position: "teacher")
}
```

16. Working with Arrays: Part I
    11분

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        greeting(name: String, position: String): String!
        grades: [Int!]!
        me: User!
        post: Post!
    }

`

// Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            }

            // [1,5,10,2]
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            })
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93]
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on graphql playground

```graphql
# Write your query or mutation here
query {
  add(numbers: [1, 5, 10, 2])
  grades
}
```

17. Working with Arrays: Part II
    22분

```javascript
// index.js

import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID

// Demo post data

const posts = [
  {
    id: "1",
    title: "GraphQL 101",
    body: "Hi, There!",
    published: true,
  },
  {
    id: "2",
    title: "GraphQL 201",
    body: "Good day, mate!",
    published: true,
  },
  {
    id: "3",
    title: "Where is the cookie?",
    body: "Oh my zsh!",
    published: false,
  },
];

// Demo user data
const users = [
  {
    id: "1",
    name: "Maph",
    email: "maph@example.com",
    age: 19,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    me() {
      return {
        id: "1239884",
        name: "Mike",
        email: "mike@example.com",
        age: 35,
      };
    },
    post() {
      return {
        id: "1234124",
        title: "Some title",
        body: "This is post",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
```

- Try on graphql playground

```graphql
query {
  posts(query: "Graph") {
    id
    title
    body
    published
  }
}
```

18. Relational Data: Basics
    15분
    ![Image of Graphs](/images/Graphs.PNG)

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo post data
const posts = [{
    id: '1',
    title: 'GraphQL 101',
    body: 'Hi, There!',
    published: true,
    author: '10'
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'Good day, mate!',
    published: true,
    author: '10'
}, {
    id: '3',
    title: 'Where is the cookie?',
    body: 'Oh my zsh!',
    published: false,
    author: '20'
}]

// Demo user data
const users = [{
    id: '10',
    name: 'Maph',
    email: 'maph@example.com',
    age: 19
},{
    id: '20',
    name: 'Sarah',
    email: 'sarah@example.com'
},{
    id: '30',
    name: 'Mike',
    email: 'mike@example.com'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id:'1239884',
                name: 'Mike',
                email: 'mike@example.com',
                age: 35
            }
        },
        post() {
            return {
                id: '1234124',
                title: 'Some title',
                body: 'This is post',
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on playground

```graphql
query {
  posts(query: "Graph") {
    id
    title
    body
    published
    author {
      id
      name
    }
  }
}
```

19. Relational Data: Arrays
    6분

20. Comment Challenge: Part I
    6분

21. Comment Challenge: Part II
    9분

22. Comment Challenge: Part III
    13분

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo post data
const posts = [{
    id: '1',
    title: 'GraphQL 101',
    body: 'Hi, There!',
    published: true,
    author: '10'
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'Good day, mate!',
    published: true,
    author: '10'
}, {
    id: '3',
    title: 'Where is the cookie?',
    body: 'Oh my zsh!',
    published: false,
    author: '20'
}]

// Demo user data
const users = [{
    id: '10',
    name: 'Maph',
    email: 'maph@example.com',
    age: 19
},{
    id: '20',
    name: 'Sarah',
    email: 'sarah@example.com'
},{
    id: '30',
    name: 'Mike',
    email: 'mike@example.com'
}]

const comments =[{
    id: '101',
    text: 'A Comment!',
    author: '10',
    post: '1'
},{
    id: '102',
    text: 'B Comment~!',
    author: '20',
    post: '2'
},{
    id: '103',
    text: 'C Comment!!!',
    author: '30',
    post: '3'
},{
    id: '104',
    text: 'D Comment....',
    author: '20',
    post: '1'
}]

// Type definitions (schema)
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on playground

```graphql
query {
  comments {
    id
    text
    author {
      id
      name
    }
    post {
      id
      title
      body
      comments {
        id
        text
      }
    }
  }
}
```

## Section 3:GraphQL Basics: Mutations

0 / 11|2시간 22분

23. Section Intro: GraphQL Basics:
    Mutations
    1분

24. Creating Data with Mutations: Part I
    18분

- install and import uuid/v4
- Create Mutation Type definitions (schema)
- Create Resolver Mutaion and createUser()

```JS
// index.js
import {
    GraphQLServer
} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Scalar types - String, Boolean, Int, Float, ID

// Demo post data
const posts = [{
    id: '1',
    title: 'GraphQL 101',
    body: 'Hi, There!',
    published: true,
    author: '10'
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'Good day, mate!',
    published: true,
    author: '10'
}, {
    id: '3',
    title: 'Where is the cookie?',
    body: 'Oh my zsh!',
    published: false,
    author: '20'
}]

// Demo user data
const users = [{
    id: '10',
    name: 'Maph',
    email: 'maph@example.com',
    age: 19
},{
    id: '20',
    name: 'Sarah',
    email: 'sarah@example.com'
},{
    id: '30',
    name: 'Mike',
    email: 'mike@example.com'
}]

const comments =[{
    id: '101',
    text: 'A Comment!',
    author: '10',
    post: '1'
},{
    id: '102',
    text: 'B Comment~!',
    author: '20',
    post: '2'
},{
    id: '103',
    text: 'C Comment!!!',
    author: '30',
    post: '3'
},{
    id: '104',
    text: 'D Comment....',
    author: '20',
    post: '1'
}]

// Type definitions (schema)
const typeDefs = `
// ...
    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
// ...
`

// Resolvers
const resolvers = {
// ...
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email);

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on graphql playground

```graphql
mutation {
  createUser(name: "Maphnew", email: "goodguy@example.com", age: 20) {
    id
    name
    email
    age
  }
}
```

25. Creating Data with Mutations: Part II
    20분

- Add function createPost, createComment in Mutation typeDef
- Add resolver

```JS
import {
    GraphQLServer
} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Scalar types - String, Boolean, Int, Float, ID

// Demo post data
const posts = [{
    id: '1',
    title: 'GraphQL 101',
    body: 'Hi, There!',
    published: true,
    author: '10'
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'Good day, mate!',
    published: true,
    author: '10'
}, {
    id: '3',
    title: 'Where is the cookie?',
    body: 'Oh my zsh!',
    published: false,
    author: '20'
}]

// Demo user data
const users = [{
    id: '10',
    name: 'Maph',
    email: 'maph@example.com',
    age: 19
},{
    id: '20',
    name: 'Sarah',
    email: 'sarah@example.com'
},{
    id: '30',
    name: 'Mike',
    email: 'mike@example.com'
}]

const comments =[{
    id: '101',
    text: 'A Comment!',
    author: '10',
    post: '1'
},{
    id: '102',
    text: 'B Comment~!',
    author: '20',
    post: '2'
},{
    id: '103',
    text: 'C Comment!!!',
    author: '30',
    post: '3'
},{
    id: '104',
    text: 'D Comment....',
    author: '20',
    post: '1'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
// ...
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email);

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author )

            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            const postPublished = posts.some((post) => post.id === args.post && post.published)

            if (!userExists || !postPublished) {
                throw new Error('Unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(comment)

            return comment
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```

- Try on playground

```graphql
mutation {
  createComment(text: "TTTTTTText", author: "10", post: "1") {
    id
    text
    post {
      id
      published
    }
    author {
      id
      name
    }
  }
}
```

26. The Object Spread Operator with Node.js
    7분

- Install babel-plugin-transform-object-rest-spread

```shell
# npm install babel-plugin-transform-object-rest-spread
```

- Modify .babelrc

```
{
    "presets": [
        "env"
    ],
    "plugins": [
        "transform-object-rest-spread"
    ]
}
```

- Modify objects like ...args

> Before

```JS
            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
```

> After

```JS
            const user = {
                id: uuidv4(),
                ...args
            }
```

27. The Input Type
    13분

```JS
// index.js

// Type definitions (schema)
// Custom Types - User, Post
const typeDefs = `
    // ...

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    // ...
`

// Resolvers
const resolvers = {
    // ...
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postPublished = posts.some((post) => post.id === args.data.post && post.published)

            if (!userExists || !postPublished) {
                throw new Error('Unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment
        }
    },
    // ...
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
```
- Test createUser
```graphql
mutation {
  createUser(
    data: {
      name: "Jess",
      email: "Jess@example.com",
      age:38
    }
  ) {
    id
    name
    email
    age
  }
}

```
- Test createPost
```graphql
mutation {
  createPost(
    data: {
      title: "My new post.",
      body: "dfgsdfgsdfgsdfg",
      published: true,
      author: "10"
    }
  ) {
    id
    title
    body
    published
    author {
      name
    }
    comments {
      id
    }
  }
}
```
- Test createComment
```graphql
mutation {
  createComment(
    data: {
      text: "TTTTTTText",
      author: "10",
      post: "1"
    }
  ) {
    id
    text
    post {
      id
      published
    }
    author {
      id
      name
    }
  }
}
```
28. Deleting Data with Mutations: Part I
    17분

29. Deleting Data with Mutations: Part II
    13분
- Add delete type definitions
```JS
// index.js

// ...

// Type definitions (schema)
// Custom Types - User, Post
const typeDefs = `
    // ...

    type Mutation {
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
        deleteComment(id: ID!): Comment!
    }

    // ...
`
```
- Add resolvers
```JS
// Resolvers
const resolvers = {
    //...
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)

            return user
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)

            if (userIndex === -1) {
                throw new Error('User not found')
            }

            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if (match) {
                    comments = comments.filter((comment) => comment.post !== post.id)
                }

                return !match
            })

            comments = comments.filter((comment) => comment.author !== args.id)

            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        deletePost(parent, args, ctx, info) {
            const postExists = posts.findIndex((post) => post.id === args.id)

            if (postExists === -1) {
                throw new Error('Post not found')
            }

            const deletedPosts = posts.splice(postExists, 1)
            // console.log(deletedPosts)
            comments = comments.filter((comment) => comment.post !== args.id)

            return deletedPosts[0]

        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postPublished = posts.some((post) => post.id === args.data.post && post.published)

            if (!userExists || !postPublished) {
                throw new Error('Unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex((comment) => comment.id === args.id)

            if (commentIndex === -1) {
                throw new Error('Comment not found')
            }

            const deletedComment = comments.splice(commentIndex, 1)

            return deletedComment[0]
        }
    },
    //...
}

// ...
```


30. A Pro GraphQL Project Structure: Part I
    17분

- Create schema.graphql AND cut and paste the type from index.js
```graphql
# schema.graphql

type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  me: User!
  post: Post!
  comments: [Comment!]!
}

# ...

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

```

- Import graphql
```JS
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})
```

- Context

- Create db.js
- Put the Array to db.js from index.js
- Import db
```JS
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db
    }
})
```
- And Change ctx to { db } and users to db.users, posts to db.posts, comments to db.comments
```JS
// Example
// index.js
// ...

    Comment: {
        author(parent, args, { db }, info) {
            return db.users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, { db }, info) {
            return db.posts.find((post) => {
                return post.id === parent.post
            })
        }
    }

// ...
```


31. A Pro GraphQL Project Structure: Part II
    9분

- Create Query, Mutation, User, Post, Comment in resolvers folder
- Put the all of resolvers to those resolvers

```JS
// index.js

import {
    GraphQLServer
} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})
```

32. Updating Data with Mutations: Part I
    12분

- Add "updateUser" type
```graphql
# ...
type Mutation {
  createUser(data: CreateUserInput): User!
  deleteUser(id: ID!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  createPost(data: CreatePostInput): Post!
  deletePost(id: ID!): Post!
  createComment(data: CreateCommentInput): Comment!
  deleteComment(id: ID!): Comment!
}
# ...
```
- Update updateUser resolver in Mutation.js 
```JS
// Mutation.js
updateUser(parent, args, {db}, info) {
        const {id, data} = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email taken')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user

    }
```

- Test on playground
```graphql
# Test
mutation {
  updateUser(id:10, data: {email: "mike@example.com"}) {
    id
    name
    email
    age
  }
}
```
33. Updating Data with Mutations: Part II
    16분
- Add "updatePost", "updateComment" type
```graphql
# ...
type Mutation {
  createUser(data: CreateUserInput): User!
  deleteUser(id: ID!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  createPost(data: CreatePostInput): Post!
  deletePost(id: ID!): Post!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  createComment(data: CreateCommentInput): Comment!
  deleteComment(id: ID!): Comment!
  updateComment(id: ID!, data: UpdateCommentInput!): Comment!
}
# ...
```
- Update "updatePost", "updateComment" resolvers in Mutation.js 
```JS
// ...
updatePost(parent, args, {db}, info){
        const {id, data} = args
        const post = db.posts.find((post) => post.id === id)

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published
        }

        return post
    },
// ...
updateComment(parent, args, {db}, info) {
        const { id, data } = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    }
// ...
```

- Test on playground
```graphql
# Test updatePost
mutation {
  updatePost(id:1, data: {published:false}) {
    title
    body
    published
  }
}

# Test updateComment
mutation {
  updateComment (id:"101", data:{text: "This !"}) {
    id
    text
  }
}
```

## Section 4:GraphQL Basics: Subscriptions
0 / 7|1시간 13분

34. Section Intro: GraphQL Basics: Subscriptions
    1분

35. GraphQL Subscription Basics
    15분

- REF: https://github.com/apollographql/graphql-subscriptions
- Import PubSub
- Create a instance
- Put it in the context

```JS
// index.js

import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})
```
- Create Subscription.js
```JS
// resolvers/Subscription.js

const Subscription = {
    count: {
        subscribe(parent, args, {pubsub}, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    }
}

export { Subscription as default }
```
- Create a type Subscription
```graphql
# src/schema.graphql
# ...
type Subscription {
  count: Int!
}
# ...
```

36. Setting up a Comments Subscription
    11분

- Add resolver comment

```JS
// resolvers/Subscription.js
// ...
comment: {
        subscribe(parent, {postId}, {db, pubsub}, info){
            const post = db.posts.find((post) => post.id === postId && post.published)

            if(!post) {
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    }
// ...
```
- Add comment
```graphql
# schema.graphql
type Subscription {
  count: Int!
  comment(postId: ID!): Comment!
}

```
- Add pubsub and publish it
```JS
// resolver/Mutation.js

    createComment(parent, args, {db, pubsub}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postPublished = db.posts.some((post) => post.id === args.data.post && post.published)

        if (!userExists || !postPublished) {
            throw new Error('Unable to find user and post')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, {comment})

        return comment
    }
```

- Test on playground
```graphql
subscription {
  comment(postId:"1"){
    id
    text
    author{
      id
      name
    }
  }
}
```
37. Setting up a Posts Subscription
    8분

- Set post subscription
```graphql
# schema.graphql
# ...
type Subscription {
  comment(postId: ID!): Comment!
  post: Post!
}
# ...
```

- Add resolver
```JS
// resolvers/Subscription.js
// ...
    post: {
        subscribe(paren, args, {pubsub}, info){
            return pubsub.asyncIterator(`post`)
        }
    }
// ...
```
- Modify createPost mutation
```JS
// Mutation.js

    createPost(parent, args, {db, pubsub}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found.')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        if(args.data.published){
            pubsub.publish('post', {post})
        }

        return post
    }
```
38. Expanding the Posts Subscription for Edits and Deletions
    20분

- Modify post
```graphql
# schema.graphql
# ...
type Subscription {
  comment(postId: ID!): Comment!
  post: PostSubscriptionPayload!
}
# ...
type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}
```
- Modify resolver
```JS
// ...
    post: {
        subscribe(paren, args, {pubsub}, info){
            return pubsub.asyncIterator(`post`)
        }
    }
// ...
```
- Modify updatePost resolver and many conditions
```JS
updatePost(parent, args, {db,pubsub}, info){
        const {id, data} = args
        const post = db.posts.find((post) => post.id === id)
        const originalPost = { ...post }

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published

            if (originalPost.published && !post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if (!originalPost.published && post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post
    }
```
- Test on playground
```graphql
# subscription
subscription {
  post{
		mutation
    data {
      id
      title
      body
      author {
        id
        name
      }
    }
  }
}
```
```graphql
# updatePost - create
mutation {
  updatePost(id:3, data: {published:true}) {
    title
    body
    published
  }
}
```
```graphql
# updatePost - update
mutation {
  updatePost(id:3, data: {published:false}) {
    title
    body
    published
  }
}
```
```graphql
# updatePost - update
mutation {
  updatePost(id:3, data: {body:" Something new... "}) {
    title
    body
    published
  }
}
```

39. Expanding the Comments Subscription for Edits and Deletions
    10분
- Creat SubscriptionPayload
```graphql
# schema.graphql
#...
type Subscription {
  comment(postId: ID!): CommentSubscriptionPayload!
  post: PostSubscriptionPayload!
}
# ...
type CommentSubscriptionPayload {
  mutation: String!
  data: Comment!
}
```
- Modify resolvers
```JS
// Mutation.js
createComment(parent, args, {db, pubsub}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postPublished = db.posts.some((post) => post.id === args.data.post && post.published)

        if (!userExists || !postPublished) {
            throw new Error('Unable to find user and post')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, args, {db, pubsub}, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedComment
            }
        })


        return deletedComment
    },
    updateComment(parent, args, {db, pubsub}, info) {
        const { id, data } = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'UPDATED',
                data: comment
            }
        })

        return comment
    }
```
- Test your work
```graphql
subscription {
  comment(postId:"1") {
    mutation
    data {
      id
      text
      author{
        id
        name
      }
    }
  }
}
```
- createComment
```graphql
mutation {
  createComment(data:{
    text: "My new comment",
    author:"10",
    post: "1"
  }) {
    id
    text
  }
}
```
- updateComment
```graphql
mutation {
  updateComment(
    id:"6052739a-0bc6-4340-8b8d-6822f296ccf7",
    data:{
      text:"This did not work"
    }
  ){
    id
    text
  }
}
```
- deleteComment
```graphql
mutation {
  deleteComment(
    id:"6052739a-0bc6-4340-8b8d-6822f296ccf7"
  ){
    id
    text
  }
}
```
40. Enums
    9분
- Set enum for mutation type
```graphql
enum MutationType {
  CREATED
  UPDATED
  DELETED
}

type PostSubscriptionPayload {
  mutation: MutationType!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  data: Comment!
}
```

## Section 5:Database Storage with

Prisma v1
0 / 17|3시간 54분

41. Section Intro: Database Storage with Prisma
    1분

42. What is Prisma?
    9분

43. Prisma Mac Setup
    13분

44. Prisma Windows Setup
    15분

- Set Heroku postgreSQL server(free)
- Download and install and launch pgAdmin
- Add Heroku PG on pgAdmin with infomation about the db server
- Install docker toolbox

> REF for applying: https://docs.docker.com/docker-for-windows/wsl/
```shell
wsl --set-version Ubuntu 2
```

45. Prisma Ubuntu Setup
    17분

46. Prisma 101
    17분

- Install prisma npm
- Create a folder 'graphql-prisma'
- Init prisma at the folder
```shell
> npm i -g prisma@1.34.10
> prisma -v
> prisma init prisma
Use existing DB
PostgreSQL
No data
host
port
user
password
database name
ssl Y
Do not generate client
```
```shell
cd prisma
docker-compose up -d
prisma deploy
```
```
Creating stage default for service default ✔
Deploying service `default` to stage `default` to server `local` 17.6s

Changes:

  User (Type)
  + Created type `User`
  + Created field `id` of type `ID!`
  + Created field `name` of type `String!`

Applying changes 74.9s

Your Prisma endpoint is live:

  HTTP:  http://localhost:4466
  WS:    ws://localhost:4466

You can view & edit your data here:

  Prisma Admin: http://localhost:4466/_admin
```
- Visit localhost:4466

47. Exploring the Prisma GraphQL API
    13분
- Test on loacalhost:4466
```graphql
mutation {
  createUser(
    data: {
      name: "Maphnew Kim"
    }
  ) {
    id
    name
  }
}
```
- Output
```json
{
  "data": {
    "createUser": {
      "id": "ckemrwo2b002o0773eyr5xplw",
      "name": "Maphnew Kim"
    }
  }
}
```

- Check pgAdmin database > schemas > default$default > Tables > User : Right Click > View/Edit data > All Rows

- Query users
```graphql

query {
  users {
    id
    name
  }
}

```

- updateUser

```graphql

mutation {
  updateUser(
    where: {
      id: "ckemrwo2b002o0773eyr5xplw"
    },
    data: {
      name: "Maphnew"
    }
  ) {
    id
    name
  }
}

```

- deleteUser
```graphql

mutation {
  deleteUser(where:{
    id: "ckems93rn005f0773xaaudg1z"
  }) {
    id
    name
  }
}

```
48. Add Post type to Prisma
    18분

- Modify datamodel
```graphql
# datamodel.prisma

type User {
  id: ID! @id
  name: String!
  email: String! @unique
  posts: [Post!]!
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User!
}
```

- deploy
```shell
> prisma deploy
```
- Test
- CreatePost
```graphql
mutation {
  createPost(
    data:{
      title: "Prisma Post",
      body: "",
      published: false,
      author: {
        connect: {
          id: "ckemteglg00j30773ltubj6g5"
        }
      }
    }
  ){
    id
    title
    body
    published
    author{
      id
      name
    }
  }
}
```

49. Adding Comment Type to Prisma
    12분

- Edit datamodel
```graphql
# datamodel.prisma
type Comment {
  id: ID! @id
  text: String!
  author: User!
  post: Post!
}
```
- deploy
```shell
> prisma deploy
```
- Test
- Update only post to be published
```graphql
mutation{
  updatePost(data:{
    published: true
  }
  where:{
    id:"ckemudh6c01130773uibl2bu4"
  }){
    id
    title
    body
    published
    author{
      id
      name
    }
  }
}
```
- Create a new user
```graphql
mutation {
  createUser(
    data: {
      name: "Maphnew",
      email: "Maphnew@example.com"
    }
  ) {
    id
    name
    email
  }
}
```
- Have new user comment on the one existing post
```graphql
mutation{
  createComment(
    data:{
      text: "comment!"
      author: {
        connect: {
          id: "ckemussou014h0773crf3r1k2"
        }
      }
      post: {
        connect: {
          id: "ckemudh6c01130773uibl2bu4"
        }
      }
    }
  ){
    id
    text
    author{
      name
    }
    post{
      title
    }
  }
}
```
- Fetch all comments
```graphql
query {
  comments {
    id
    text
    author{
      name
    }
    post{
      title
    }
  }
}
```

50. Integrating Prisma into a Node.js Project
    17분

- COPY all of the files in graphql-basics folder to inside of graphql-prisma
- Install prisma-binding
```shell
graphql-prisma$ npm i prisma-binding@2.3.16
```
- Create src/prisma.js
```JS
import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'localhost:4466'
})
```
- Install graphql-cli@2.16.4
- Version matters
- Create graphql-prisma/.graphqlconfig
- See it like JOSN file (VS Code - View - Command Palette - Change Language Mode - JSON)
- Create a folder src/generated/
```JSON
// graphql-prisma/.graphqlconfig
{
    "projects": {
        "prisma": {
            "schemaPath": "src/generated/prisma.graphql",
            "extensions": {
                "endpoints": {
                    "default": "http://localhost:4466"
                }
            }
        }
    }
}
```
- Add a command on package.json
```JSON
// package.json

  "scripts": {
// ...
    "get-schema": "graphql get-schema -p prisma"
  },

```
- Run it
```shell
graphql-prisma& npm run get-schema
```
- Check in the generated folder(prisma.graphql file)

51. Using Prisma Bindings
    13분
- Add Prisma Bindings
```JS
// prisma.js

import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

prisma.query.users(null, '{ id name email posts {id title}}').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})

prisma.query.comments(null, '{id text author {id name}}').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})
```
- Import prisma.js
```JS
// index.js
import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})
```
- RUN
```shell
npm start
```
```shell
[
  {
    "id": "ckemteglg00j30773ltubj6g5",
    "name": "Beackam",
    "email": "Beackam@example.com",
    "posts": [
      {
        "id": "ckemudh6c01130773uibl2bu4",
        "title": "Prisma Post"
      }
    ]
  },
  {
    "id": "ckemtu6ea00p50773ve3c5zin",
    "name": "Beackam",
    "email": "Beackam2@example.com",
    "posts": []
  },
  {
    "id": "ckemussou014h0773crf3r1k2",
    "name": "Maphnew",
    "email": "Maphnew@example.com",
    "posts": []
  }
]
[
  {
    "id": "ckemv0bqx019j0773h62oi84b",
    "text": "comment!",
    "author": {
      "id": "ckemussou014h0773crf3r1k2",
      "name": "Maphnew"
    }
  }
]
```
52. Mutations with Prisma Bindings
    15분

53. Using Async/Await with Prisma Bindings
    18분

54. Checking If Data Exists Using Prisma Bindings
    15분

55. Customizing Type Relationships
    13분

56. Modeling a Review System with Prisma: Set Up
    11분

57. Modeling a Review System with Prisma: Solution
    17분

## Section 6:Authentication with

GraphQL
0 / 24|5시간 14분

58. Section Intro: Authentication with GraphQL
    1분

59. Adding Prisma into GraphQL
    Queries
    16분

60. Integrating Operation Arguments
    14분

61. Refactoring Custom Type
    Resolvers
    9분

62. Adding Prisma into GraphQL
    Mutations
    14분

63. Adding Prisma into GraphQL
    Update Mutations: Part I
    13분

64. Adding Prisma into GraphQL
    Update Mutations: Part II
    16분

65. Adding Prisma into GraphQL
    Subscriptions
    19분

66. Closing Prisma to the Outside
    World
    8분

67. Allowing for Generated Schemas
    9분

68. Storing Passwords
    11분

69. Creating Auth Tokens with JSON
    Web Tokens
    20분

70. Logging in Existing Users
    16분

71. Validating Auth Tokens
    16분

72. Locking Down Mutations (Users)
    13분

73. Locking Down Mutations (Posts
    and Comments)
    16분

74. Locking Down Queries: Part I
    19분

75. Locking Down Queries: Part II
    10분

76. Locking Down Individual Type
    Fields
    11분

77. Fragments
    19분

78. Cleaning up Some Edge Cases
    11분

79. Locking Down Subscriptions
    10분

80. Token Expiration
    11분

81. Password Updates
    9분

## Section 7:Pagination and Sorting

with GraphQL
0 / 5|49분

82. Section Intro: Pagination and
    Sorting with GraphQL
    1분

83. Pagination
    11분

84. Pagination Using Cursors
    10분

85. Working with createdAt and
    updatedAt
    10분

86. Sorting Data
    16분

## Section 8:Production Deployment

0 / 7|1시간 23분

87. Section Intro: Production
    Deployment
    1분

88. Creating a Prisma Service
    14분

89. Prisma Configuration and
    Deployment
    11분

90. Exploring the Production Prisma
    Instance
    6분

91. Node.js Production App
    Deployment: Part I
    14분

92. Node.js Production App
    Deployment: Part II
    19분

93. Node.js Production Environment
    Variables
    18분

## Section 9:Apollo Client and Testing

GraphQL
0 / 19|4시간 3분

94. Section Intro: Apollo Client and
    Testing GraphQL
    1분

95. Setting up a Test Environment
    4분

96. Installing and Exploring Jest
    11분

97. Testing and Assertions
    21분

98. Apollo Client in the Browser: Part I
    7분

99. Apollo Client in the Browser: Part II
    17분

100.  Configuring Jest to Start the
      GraphQL Server
      15분

101.  Testing Mutations
      13분

102.  Seeding the Database with Test
      Data
      12분

103.  Testing Queries
      9분

104.  Expecting GraphQL Operations to
      Fail
      12분

105.  Supporting Multiple Test Suites
      and Authentication
      13분

106.  Testing with Authentication: Part I
      18분

107.  Testing with Authentication: Part
      II
      18분

108.  GraphQL Variables: Part I
      19분

109.  GraphQL Variables: Part II
      9분

110.  Testing Comments
      19분

111.  Testing Subscriptions
      23분

112.  Test Case Ideas
      3분

## Section 10:Creating a Boilerplate

Project
0 / 3|28분

113. Section Intro: Creating a
     Boilerplate Project
     1분

114. Creating a Boilerplate Project
     17분

115. Using the Boilerplate Project
     10분

## Section 11:Wrapping Up

0 / 3|9분

116. Section Intro: Wrapping Up
     1분

117. A New App Idea
     5분

118. Bonus: Where Do I Go from
     Here?
     3분
