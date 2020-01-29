import Sequelize from 'sequelize';
import config from '../config';

export const db = new Sequelize(config.Database, config.User, config.Password, {
    host: config.Host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

