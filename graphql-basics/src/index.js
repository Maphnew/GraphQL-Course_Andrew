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
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
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
        comments(parent, args, ctx, info) {
            return comments
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