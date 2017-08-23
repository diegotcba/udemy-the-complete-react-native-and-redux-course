import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_UPDATE, EMPLOYEE_SAVE, 
	EMPLOYEE_INIT_SAVE,  EMPLOYEE_SAVE_SUCCESS, 
	ENPLOYEE_SAVE_FAIL,  EMPLOYEES_FETCH_INIT,
	EMPLOYEES_FETCH_SUCCESS, EMPLOYEES_FETCH_FAIL } from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

export const employeeSave = ({name, phone, shift }) => {
	return (dispatch) => {
		//console.log('employeeSave event');
		dispatch({ type: EMPLOYEE_INIT_SAVE});

		const { currentUser } = firebase.auth();

		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
			.then(() => {
				employeeSaveSuccess(dispatch);
			})
			.catch(() => {
				employeeSaveFail(dispatch);
			});
	};
};

const employeeSaveSuccess = (dispatch) => {
	//console.log('employeeSaveSuccess event');

	dispatch({
		type: EMPLOYEE_SAVE_SUCCESS
	});

	Actions.employeeList({ type: 'reset' });
};

const employeeSaveFail = (dispatch) => {
	dispatch({
		type: ENPLOYEE_SAVE_FAIL
	});
};

export const employeesFetch = () => {
	return (dispatch) => {
		dispatch({ type: EMPLOYEES_FETCH_INIT});

		const { currentUser } = firebase.auth();

		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				employeesFetchSuccess(snapshot.val(), dispatch);
			});
			// .once('value')
			// .then((data) => employeesFetchSuccess(data, dispatch))
			// .catch(() => employeesFetchFail());
	};
};

const employeesFetchSuccess = (data, dispatch) => {
	dispatch({
		type: EMPLOYEES_FETCH_SUCCESS,
		payload: data
	});
};

const employeesFetchFail = () => {
	dispatch({
		type: EMPLOYEES_FETCH_FAIL
	});
};