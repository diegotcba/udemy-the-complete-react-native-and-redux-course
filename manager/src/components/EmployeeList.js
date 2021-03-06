import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { employeesFetch } from '../actions'
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		//nextProps are the next set of props
		//that this component will be rendered with
		//this.props is still the old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	render() {
		//console.log(this.props.employees);

		return(
			<ListView 
				enableEmptySections
				dataSource = {this.dataSource}
				renderRow = { this.renderRow }
			 />
		);
	}
}

const mapStateToProps = (state) => {
	const emp = _.map(state.employees.employees, (value, uid) => {
		return { ...value, uid }; // { shift: 'Monday', name: '', uid: 'asdfsd'}
	});

	//console.log(emp);

	return {
		employees: emp,
		loading: state.employees.loading
	};
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);