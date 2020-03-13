class AuthorizationService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async login(login, password) {
        const user = await this.userModel.findOne({
            where: {
                login,
                password
            }
        });

        return user;
    }
}

export default AuthorizationService;
