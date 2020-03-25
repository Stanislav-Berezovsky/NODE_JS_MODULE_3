import 'dotenv/config';

export default {
    Host: process.env.HOST,
    Database: process.env.DATABASE,
    User: process.env.USER,
    Password: process.env.PASSWORD,
    secret: process.env.SECRET
};

