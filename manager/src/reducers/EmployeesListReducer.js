import {EMPLOYEES_FETCH_INIT,
	EMPLOYEES_FETCH_SUCCESS, EMPLOYEES_FETCH_FAIL} from '../actions/types';

const INITIAL_STATE = {
	employees: {},
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case EMPLOYEES_FETCH_SUCCESS:
			return { ...state, employees: action.payload };
		default:
			return state;
	}
};