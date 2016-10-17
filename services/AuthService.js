import {LoginConstants} from '../constants/LoginConstants';
import {ajax} from '../utils/Utility.js';
import LoginActions from '../actions/LoginActions';

class AuthService {

	login(username, password) {
		let data = {
			"j_username": username,
			"j_password": password
		};
		return ajax(LoginConstants.LOGIN_URL, 'POST',data, this.handleAuth, null,  "application/json");
	}

	logout() {
		return LoginActions.logoutUser();
	}

	handleAuth(data, status, jqXHR) {
		LoginActions.loginUser(data);
		return true;
	}
}

export default new AuthService()
