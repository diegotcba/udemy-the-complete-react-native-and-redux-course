import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, INIT_LOGIN, LOGIN_FAILED} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	}
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => { 
		dispatch({ type: INIT_LOGIN});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch((error) => {
				console.log(error);
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginUserSuccess(dispatch, user))
					.catch(() => loginUserFaild(dispatch));
			});
	};
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({ 
		type: LOGIN_SUCCESS,
		payload: user
	});

	Actions.employeeList();
};

const loginUserFaild = (dispatch) => {
	dispatch({ type: LOGIN_FAILED, payload: 'Authentication Failed!'});
}