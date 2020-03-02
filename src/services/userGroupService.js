import { db }  from '../DAL/DBConfiguration';

class UserGroupService {
    constructor({ model, userService, groupService }) {
        this.model = model;
        this.userService = userService;
        this.groupService = groupService;
    }

    getAllItems() {
        return this.model.findAll();
    }

    async addUsersToGroup({ groupId, userIds }) {
        const transaction = await db.transaction();
        try {
            const group = await this.groupService.getItemById({ id: groupId, transaction });

            if (!group) {
                await transaction.rollback();
                return false;
            }


            for (const userId of userIds) {
                const user = await this.userService.getItemById({ id: userId, transaction });
                if (!user) {
                    await transaction.rollback();
                    return false;
                }

                await this.model.create({ userId, groupId }, { transaction });
            }

            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}

export default UserGroupService;
