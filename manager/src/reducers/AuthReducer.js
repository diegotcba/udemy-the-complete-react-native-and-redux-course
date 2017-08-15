import {EMAIL_CHANGED, PASSWORD_CHANGED, INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/types';

const INITIAL_STATE = { 
	email: '',
	password: '',
	loading: false,
	error: '',
	user: null
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case INIT_LOGIN:
			return { ...state, error: '', loading: true };
		case LOGIN_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_FAILED:
			return { ...state, loading: false, error: action.payload, password: ''};
		default:
			return state;
	}
}