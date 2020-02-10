class UserGroupService {
    constructor(model) {
        this.model = model;
    }

    getAllItems() {
        return this.model.findAll()
            .catch(console.log);
    }
}

export default UserGroupService;
