import React, { Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };

	onButtonPress() {
		const { email, password } = this.state;

		this.setState({error: '', loading: true});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoadingSuccess.bind(this))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoadingSuccess.bind(this))
					.catch(this.onLoginFailed.bind(this));
			});
	}

	onLoginFailed() {
		this.setState({ error: 'Authentication Failed', loading: false});
	}

	onLoadingSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	renderButton() {
		if(this.state.loading) {
			return <Spinner size="small" />
		} else {
			return(
				<Button onPress={this.onButtonPress.bind(this)}>
					Log in
				</Button>
			);
		}
	}

	render() {
		return(
			<Card>
				<CardSection>
					<Input
						placeholder="user@gmail.com"
						label="Email"
						value={this.state.email}
						onChangeText={ text => this.setState({email: text})} 
					/>
				</CardSection>
				<CardSection>
					<Input
						placeholder="password"
						label="Password"
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={ text => this.setState({password: text})} 
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.state.error}
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

export default LoginForm;