import Sequelize from 'sequelize';
import { db } from '../DAL/DBConfiguration';
import User from './UserModel';
import Group from './GroupModel';

const UserGroup = db.define('userGroup', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {  model: 'users', key: 'id' }
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {  model: 'groups',  key: 'id' }
    }
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default UserGroup;
