import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave } from '../actions';

class EmployeeCreate extends Component {
	onButtonPress() {
		const { name, phone, shift } = this.props;

		console.log('onButtonPress event!');
		this.props.employeeSave({name, phone, shift: shift || 'Monday'});
	}

	renderButton() {
		if(this.props.loading) {
			return <Spinner size="large" />
		} else {
			return(
				<Button onPress={this.onButtonPress.bind(this)}>
				Create
				</Button>
			);
		}
	}

	render() {

		return(
			<Card>
				<EmployeeForm { ...this.props} />

				<Text style={styles.errorTextStyle}>
					{ this.props.error }
				</Text>

				<CardSection>
					{ this.renderButton() }
				</CardSection>

			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		name: state.employee.name,
		phone: state.employee.phone,
		shift: state.employee.shift,
		loading: state.employee.loading,
		error: state.employee.error
	};
};

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}	
};


export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EmployeeCreate);