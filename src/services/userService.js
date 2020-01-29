import Sequelize from 'sequelize';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAllUsers() {
        return this.userModel.findAll()
            .catch(console.log);
    }

    getUserById(id) {
        return this.userModel.findByPk(id)
            .catch(console.log);
    }

    getAutosuggestedUsers({ loginSubstring, limit }) {
        return this.userModel.findAll({
            where: {
                login: {
                    [Sequelize.Op.substring]: loginSubstring
                }
            },
            order: [
                ['login', 'ASC']
            ],
            limit
        })
            .catch(console.log);
    }

    addUser(userProps) {
        return this.userModel.create({  ...userProps, isDeleted: false })
            .catch(console.log);
    }

    async updateUser({ id, ...restUserProps }) {
        const userToUpdate = await this.getUserById(id);
        if (!userToUpdate) {
            return null;
        }

        return this.userModel.update({...restUserProps }, {  where: { id }, returning: true })
            .catch(console.log);
    }

    async deleteUserById(id) {
        const userToUpdate = await this.getUserById(id);

        if (!userToUpdate) {
            return null;
        }

        return this.userModel.update({ isDeleted: true }, {  where: { id }, returning: true })
            .catch(console.log);
    }
}

export default UserService;
