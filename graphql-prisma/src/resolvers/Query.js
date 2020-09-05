const Query = {
    users(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    },
    comments(parent, args, {
        db
    }, info) {
        return db.comments
    },
    me() {
        return {
            id: '1239884',
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

export { Query as default }