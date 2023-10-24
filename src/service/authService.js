import AuthApi from "../api/Auth/authApi";
class AuthService {
    async authLogin(data){
        return await AuthApi.login(data);
    }
    async authencationToken(accessToken){
        return await AuthApi.authencationToken(accessToken);
    }
}
export default new AuthService();