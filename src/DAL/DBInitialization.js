import connectDB from './DBConnection';
import UserModel from '../Models/userModel';
import usersList from './InitialData/userData';
import GroupModel from '../Models/groupModel';
import groupList from './InitialData/groupData';
import UserGroupModel from '../Models/userGroupModel';
import userGroupList from './InitialData/userGroupData';

const init = async () => {
    try {
        await connectDB();

        [
            { tableName: 'users', model: UserModel, data: usersList },
            { tableName: 'groups', model: GroupModel, data: groupList },
            { tableName: 'userGroup', model: UserGroupModel, data: userGroupList }
        ].forEach(async ({ tableName, model, data }) => {
            await model.sync({ force: true });
            await model.bulkCreate(data);
            console.log(`${ tableName } table has been initialized successfully`);
        });
    }
    catch (e) {
        console.log(e);
    }
};

init();
