const _ = require('lodash');

const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
    Query: {
        posts: () => posts,
        author: (__, author) => _.find(authors, { id: author.id }),
        countPosts: () => posts.length
    },
    Mutation: {
        upvotePost: (__, data) => {
            const post = _.find(posts, { id: data.postId });
            if (!post) {
                throw new Error(`Couldn't find post with id ${data.postId}`);
            }
            post.votes += 1;
            return post;
        },
        addPost: (__, data) => {
            const post = {};

            posts.push(Object.assign(post, data, { id: _.uniqueId() }));

            return post;
        }
    },
    Author: {
        posts: (author) => _.filter(posts, { authorId: author.id }),
    },
    Post: {
        author: (post) => _.find(authors, { id: post.authorId }),
    },
};

module.exports = resolvers;
