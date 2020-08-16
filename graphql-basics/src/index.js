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
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        isStock: Boolean!
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
            return 1.1
        },
        title() {
            return 'Something'
        },
        price() {
            return 15.20
        },
        releaseYear() {
            return 2005
        },
        rating() {
            return 4.5
        },
        isStock() {
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