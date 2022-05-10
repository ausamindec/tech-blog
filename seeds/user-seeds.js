const { User } = require('../models');

const userData = [
    {
        user_name: "mik",
        email: "mike@gmail.com",
        password: "test"
    },
    {
        user_name: "tom8",
        email: "tom@gmail.com",
        password: "pass"
    },
    {
        user_name: "john5",
        email: "john@gmail.com",
        password: "john"
    }
   
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;