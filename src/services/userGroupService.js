// import Sequelize from 'sequelize';
import { db }  from '../DAL/DBConfiguration';

class UserGroupService {
    constructor({ model, userModel, groupModel }) {
        this.model = model;
        this.userModel = userModel;
        this.groupModel = groupModel;
    }

    getAllItems() {
        return this.model.findAll()
            .catch(console.log);
    }

    async addUsersToGroup({ groupId, userIds }) {
        const transaction = await db.transaction();
        try {
            const group = await this.groupModel.findByPk(groupId, { transaction });

            if (!group) {
                await transaction.rollback();
                return false;
            }


            for (const userId of userIds) {
                const user = await this.userModel.findByPk(userId, { transaction });
                if (!user) {
                    await transaction.rollback();
                    return false;
                }

                await this.model.create({ userId, groupId }, { transaction });
            }

            await transaction.commit();
            return true;
        } catch (e) {
            console.log(e);
            await transaction.rollback();
        }
    }
}

export default UserGroupService;
