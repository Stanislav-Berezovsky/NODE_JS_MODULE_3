class AbstractModelService {
    constructor(model) {
        this.model = model;
    }

    getAllItems() {
        return this.model.findAll()
            .catch(console.log);
    }

    getItemById(id) {
        return this.model.findByPk(id)
            .catch(console.log);
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
        const item = await this.getItemById(id);
        if (!item) {
            return null;
        }

        return this.model.update({ ...restProps }, {  where: { id }, returning: true })
            .catch(console.log);
    }
}

export default AbstractModelService;
