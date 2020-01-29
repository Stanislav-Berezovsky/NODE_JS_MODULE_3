import { db } from './DBConfiguration';
import UserModel from '../Models/UserModel';
import usersList from './initialData';

export default () => {
    db.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            UserModel.sync({ force: true })
                .then(() => UserModel.bulkCreate(usersList))
                .then(() => console.log('Database has been initialized successfully'))
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};
