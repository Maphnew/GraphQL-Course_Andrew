import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.exists.Comment({
//     id: "ckemv0bqx019j0773h62oi84b",
//     author: {
//         id: "ckemussou014h0773crf3r1k2"
//     }
// }).then((exists) => {
//     console.log(exists)
// })

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({
        id: authorId
    })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }')

    return post.author
}

// createPostForUser('ckemussou014h0773crf3r1k2', {
//     title: 'Great Books to Read',
//     body: 'The war of art',
//     published: true
// }).then((user) => {
//     console.log(user)
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })



const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if (!postExists) {
        throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name email posts { id title published } } }')

    return post.author
}

updatePostForUser("ckfwn1nif000h0773qupjev5s", { published: true }).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error.message)
})

// prisma.mutation.updatePost({
//     where: {
//         id: "ckfuw4tet000d07731lrjib9o"
//     },
//     data: {
//         body: "This is ...",
//         published: true
//     }
// }, '{ id }').then((data) => {
//     return prisma.query.posts(null, '{ id, title, body, published }')
// }).then((data) => {
//     console.log(data)
// })