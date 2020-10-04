import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name email posts {id title}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{id text author {id name}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckemussou014h0773crf3r1k2",
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.updatePost({
    where: {
        id: "ckfuw4tet000d07731lrjib9o"
    },
    data: {
        body: "This is ...",
        published: true
    }
}, '{ id }').then((data) => {
    return prisma.query.posts(null, '{ id, title, body, published }')
}).then((data) => {
    console.log(data)
})