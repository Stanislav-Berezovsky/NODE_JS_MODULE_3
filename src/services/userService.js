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
}

export default UserService;
