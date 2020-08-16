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