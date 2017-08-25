import React from 'react';
import {Text, View, Modal } from 'react-native';
import { CardSection } from './card-section';
import { Button } from './button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
	
	//const { constainerStyle, textStyle, cardSectionStyle } = styles;

	return(
		<Modal 
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {}}
		>
			<View style={styles.constainerStyle}>
				<CardSection style={styles.cardSectionStyle}>
					<Text style={styles.textStyle}>
						{children}
					</Text>
				</CardSection>

				<CardSection>
					<Button onPress={onAccept}>Yes</Button>
					<Button onPress={onDecline}>No</Button>
				</CardSection>
			</View>
		</Modal>		
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	constainerStyle: {
		backgroundColor: 'rgba(0,0,0,0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export { Confirm };