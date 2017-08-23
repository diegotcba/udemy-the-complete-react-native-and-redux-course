import React, { Component }  from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions'

class LoginForm extends Component {
	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({email, password});
	}

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	renderButton() {
		if(this.props.loading) {
			return <Spinner size="large" />
		} else {
			return (
				<Button onPress={this.onButtonPress.bind(this)}>
					Login
				</Button>
			);
		}
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>
				<CardSection>
					<Input 
						label="Password"
						placeholder="password"
						secureTextEntry
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}


const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		user: state.auth.user,
		loading: state.auth.loading,
		error: state.auth.error
	}
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);