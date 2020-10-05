import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// 1. Create a new post
// 2. Fetch all of the info about the user (author)

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email post { id title published } }')
    return user
}

// createPostForUser('ckemtu6ea00p50773ve3c5zin', {
//     title: 'Great Books to Read',
//     body: 'The war of art',
//     published: true
// }).then((user) => {
//     console.log(user)
//     console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id } }')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email posts { id title published } }')
    return user
}

// updatePostForUser("ckfwn1nif000h0773qupjev5s", { published: false }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// })

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