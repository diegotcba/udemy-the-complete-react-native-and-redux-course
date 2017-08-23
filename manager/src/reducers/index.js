import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeesListReducer from './EmployeesListReducer';

export default combineReducers({
	auth: AuthReducer,
	employee: EmployeeFormReducer,
	employees: EmployeesListReducer
});