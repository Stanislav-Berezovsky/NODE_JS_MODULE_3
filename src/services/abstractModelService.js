import { db }  from '../DAL/DBConfiguration';

class AbstractModelService {
    constructor(model) {
        this.model = model;
    }

    getAllItems() {
        return this.model.findAll();
    }

    async getItemById({ id, transaction }) {
        let dbTransaction;
        if (transaction) {
            dbTransaction = transaction;
        } else {
            dbTransaction = await db.transaction();
        }

        try {
            const item = await this.model.findByPk(id, { transaction : dbTransaction });
            if (!transaction) {
                await dbTransaction.commit();
            }
            return item;
        } catch (e) {
            await dbTransaction.rollback();
            throw e;
        }
    }

    async addItem(props) {
        return this.model.create({ ...props });
    }

    async deleteItem(id) {
        return this.model.destroy({  where: { id }, returning: true });
    }

    async updateItem({ id, ... restProps }) {
        const item = await this.getItemById({ id });
        if (!item) {
            return null;
        }

        return this.model.update({ ...restProps }, {  where: { id }, returning: true });
    }
}

export default AbstractModelService;
