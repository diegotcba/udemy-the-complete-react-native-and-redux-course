import React from 'react';
import { Image, Text, View, Linking } from 'react-native';
import Card from './card';
import CardSection from './card-section';
import Button from './button';

const AlbumDetail = ({album}) => {
	const { title, artist, url, image, thumbnail_image} = album;

	return(
		<Card>
			<CardSection>
				<View style={styles.thumbnailContainerStyle}>
					<Image
						style={styles.thumbnailStyle}  
						source={{uri: thumbnail_image}} />
				</View>
				<View style={ styles.textStyle }>
					<Text style={styles.headerTextStyle}>{title}</Text>
					<Text>{artist}</Text>
				</View>
			</CardSection>
			<CardSection>
				<Image style={styles.imageStyle}
					source={{uri: image}} />
			</CardSection>
			<CardSection>
				<Button onPress={() => Linking.openURL(url)}>
					Buy Me
				</Button>
			</CardSection>
		</Card>
	);
};

const styles = {
	textStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	},
	thumbnailStyle: {
		height: 50,
		width: 50
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null
	}
};

export default AlbumDetail;