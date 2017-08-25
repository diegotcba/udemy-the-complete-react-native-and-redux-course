import React, { Component } from 'react';
import { Modal } from 'react-native';
import Communications from 'react-native-communications';
import _ from 'lodash';
import { connect } from 'react-redux';
import {Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';

class EmployeeEdit extends Component {
	state = { showModal: false };

	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({prop, value});
		});
	}

	onButtonPress() {
		const { name, phone, shift} = this.props;

		this.props.employeeEdit({name, phone, shift, uid: this.props.employee.uid});
	}

	onTextPress() {
		const { phone, shift } = this.props;

		Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}

	onAccept() {
		const {uid} = this.props.employee;

		this.props.employeeDelete({ uid });
	}

	onDecline() {
		this.setState({showModal: false})
	}

	render() {
		return(
			<Card>
				<EmployeeForm { ...this.props} />

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedules
					</Button>
				</CardSection>	
				<CardSection>
					<Button 
						onPress={() => this.setState({showModal: !this.state.showModal})}
					>
						Delete
					</Button>
				</CardSection>	

				<Confirm 
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>						
					Are you sure you want to delete this?
				</Confirm>						
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employee;

	return { name, phone, shift }
};

export default connect(mapStateToProps, {
	 employeeUpdate, 
	 employeeEdit, 
	 employeeDelete 
	})(EmployeeEdit);