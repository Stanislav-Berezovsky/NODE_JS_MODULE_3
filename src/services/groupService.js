import uuid from 'uuid';
import AbstractModelService from './abstractModelService';

class GroupService extends AbstractModelService {
    async addItem({ name, ...groupProps }) {
        const group = await this.model.findOne({  where: { name } });

        if (group) {
            return null;
        }

        return super.addItem({  ...groupProps, name, id: uuid.v4() })
            .catch(console.log);
    }
}

export default GroupService;
