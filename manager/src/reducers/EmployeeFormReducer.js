import { EMPLOYEE_UPDATE, EMPLOYEE_INIT_SAVE,  EMPLOYEE_SAVE_SUCCESS, ENPLOYEE_SAVE_FAIL } from '../actions/types';

const INITIAL_STATE = {
	name: '',
	phone: '',
	shift: '',
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case EMPLOYEE_UPDATE:
		//action.payload = { prop: 'name', value: 'jane'}
		
		// const newState = {};
		// newState[action.payload.prop] = action.payload.value;
		// return { ...state, newState};

			return { ...state, [action.payload.prop]: action.payload.value }; //key interpolation
		case EMPLOYEE_INIT_SAVE:
			return { ...state, loading: true, error: ''};
		case EMPLOYEE_SAVE_SUCCESS:
			return INITIAL_STATE;
		case ENPLOYEE_SAVE_FAIL:
			return { ...state, loading: false, error: 'Saving employee failed!'};
		default:
			return state;
	}
};