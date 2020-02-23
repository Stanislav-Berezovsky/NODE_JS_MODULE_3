import { db } from './DBConfiguration';

export default () =>
    db.authenticate()
        .then(() =>  console.log('Connection has been established successfully.'))
        .catch(err => console.error('Unable to connect to the database:', err));

