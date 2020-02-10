import Sequelize from 'sequelize';
import AbstractModelService from './abstractModelService';

class UserService extends AbstractModelService {
    getAutosuggested({ loginSubstring, limit }) {
        return this.model.findAll({
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

    async addItem({ login, userProps }) {
        const user = await this.model.findOne({  where: { login } });

        if (user) {
            return null;
        }

        return super.addItem({  ...userProps, login, isDeleted: false })
            .catch(console.log);
    }

    async deleteItem(id) {
        const user = await this.getItemById(id);

        if (!user) {
            return null;
        }

        return this.model.update({ isDeleted: true }, {  where: { id }, returning: true })
            .catch(console.log);
    }
}

export default UserService;
