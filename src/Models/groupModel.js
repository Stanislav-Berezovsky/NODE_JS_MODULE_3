import Sequelize from 'sequelize';
import { db } from '../DAL/DBConfiguration';

const Group = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    }
});

export default Group;
