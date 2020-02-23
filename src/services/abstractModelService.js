import { db }  from '../DAL/DBConfiguration';

class AbstractModelService {
    constructor(model) {
        this.model = model;
    }

    getAllItems() {
        return this.model.findAll()
            .catch(console.log);
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
            console.log(e);
            await dbTransaction.rollback();
        }
    }

    async addItem(props) {
        return this.model.create({ ...props })
            .catch(console.log);
    }

    async deleteItem(id) {
        return this.model.destroy({  where: { id }, returning: true })
            .catch(console.log);
    }

    async updateItem({ id, ... restProps }) {
        const item = await this.getItemById({ id });
        if (!item) {
            return null;
        }

        return this.model.update({ ...restProps }, {  where: { id }, returning: true })
            .catch(console.log);
    }
}

export default AbstractModelService;
