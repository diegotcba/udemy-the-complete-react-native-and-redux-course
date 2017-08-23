import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
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
				<CardSection>
					<Input 
						label ="Name" 
						placeholder ="John Doe" 
						value = {this.props.name} 
						onChangeText = {text => this.props.employeeUpdate({prop: 'name', value: text})} />
				</CardSection>
				<CardSection>
					<Input label="Phone"
					placeholder="223-23453" 
					value = {this.props.phone}
					onChangeText = {text => this.props.employeeUpdate({prop: 'phone', value: text})} />
				</CardSection>

				<CardSection styleHH={{ flexDirection: 'column'}}>
					<Text style={styles.pickerTextStyle}>Shift</Text>
					<Picker style={{ flex: 1 }}
						selectedValue = { this.props.shift} 
						onValueChange = {(itemValue, itemIndex) => this.props.employeeUpdate({prop: 'shift', value: itemValue})}>
						<Picker.Item label="Monday" value="Monday" />
						<Picker.Item label="Tuesday" value="Tuesday" />
						<Picker.Item label="Wednesday" value="Wednesday" />
						<Picker.Item label="Thursday" value="Thursday" />
						<Picker.Item label="Friday" value="Friday" />
						<Picker.Item label="Saturday" value="Saturday" />
						<Picker.Item label="Sunday" value="Sunday" />
					</Picker>	
				</CardSection>

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
	pickerTextStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}	
};


export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EmployeeCreate);