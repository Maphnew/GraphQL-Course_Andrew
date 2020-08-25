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
}, {
    id: '20',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '30',
    name: 'Mike',
    email: 'mike@example.com'
}]

const comments = [{
    id: '101',
    text: 'A Comment!',
    author: '10',
    post: '1'
}, {
    id: '102',
    text: 'B Comment~!',
    author: '20',
    post: '2'
}, {
    id: '103',
    text: 'C Comment!!!',
    author: '30',
    post: '3'
}, {
    id: '104',
    text: 'D Comment....',
    author: '20',
    post: '1'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }