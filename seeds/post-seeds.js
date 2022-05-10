const { Post } = require('../models');

const postData = [
    {
        postTitle: "What is a java script?",
        postContent: "JavaScript is the Programming Language for the Web.JavaScript can update and change both HTML and CSS.JavaScript can calculate, manipulate and validate data.",
        user_id: 3
    },
    {
        postTitle: "What is MongoDB?",
        postContent: "MongoDB is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. ",
        user_id: 1
    },
    {
        postTitle: "What is Bootstrap?",
        postContent: "Bootstrap is the most popular CSS Framework for developing responsive and mobile-first websites.",
        user_id: 2

    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;