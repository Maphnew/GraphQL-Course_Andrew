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
  add(numbers: [1,5,10,2])
  grades
}
```
17. Working with Arrays: Part II
    22분

```javascript
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
    published: true
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'Good day, mate!',
    published: true
}, {
    id: '3',
    title: 'Where is the cookie?',
    body: 'Oh my zsh!',
    published: false
}]

// Demo user data
const users = [{
    id: '1',
    name: 'Maph',
    email: 'maph@example.com',
    age: 19
},{
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
},{
    id: '3',
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

24. Creating Data with Mutations: Part
    I
    18분

25. Creating Data with Mutations: Part
    II
    20분

26. The Object Spread Operator with
    Node.js
    7분

27. The Input Type
    13분

28. Deleting Data with Mutations: Part
    I
    17분

29. Deleting Data with Mutations: Part
    II
    13분

30. A Pro GraphQL Project Structure:
    Part I
    17분

31. A Pro GraphQL Project Structure:
    Part II
    9분

32. Updating Data with Mutations:
    Part I
    12분

33. Updating Data with Mutations:
    Part II
    16분

## Section 4:GraphQL Basics:

Subscriptions
0 / 7|1시간 13분

34. Section Intro: GraphQL Basics:
    Subscriptions
    1분

35. GraphQL Subscription Basics
    15분

36. Setting up a Comments
    Subscription
    11분

37. Setting up a Posts Subscription
    8분

38. Expanding the Posts Subscription
    for Edits and Deletions
    20분

39. Expanding the Comments
    Subscription for Edits and Deletions
    10분

40. Enums
    9분

## Section 5:Database Storage with

Prisma v1
0 / 17|3시간 54분

41. Section Intro: Database Storage
    with Prisma
    1분

42. What is Prisma?
    9분

43. Prisma Mac Setup
    13분

44. Prisma Windows Setup
    15분

45. Prisma Ubuntu Setup
    17분

46. Prisma 101
    17분

47. Exploring the Prisma GraphQL API
    13분

48. Add Post type to Prisma
    18분

49. Adding Comment Type to Prisma
    12분

50. Integrating Prisma into a Node.js
    Project
    17분

51. Using Prisma Bindings
    13분

52. Mutations with Prisma Bindings
    15분

53. Using Async/Await with Prisma
    Bindings
    18분

54. Checking If Data Exists Using
    Prisma Bindings
    15분

55. Customizing Type Relationships
    13분

56. Modeling a Review System with
    Prisma: Set Up
    11분

57. Modeling a Review System with
    Prisma: Solution
    17분

## Section 6:Authentication with

GraphQL
0 / 24|5시간 14분

58. Section Intro: Authentication with
    GraphQL
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
