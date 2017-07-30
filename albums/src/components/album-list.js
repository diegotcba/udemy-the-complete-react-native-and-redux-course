import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import AlbumDetail from './album-detail';
import axios from 'axios';

class AlbumList extends Component {
	state =  { albums: []};

	componentWillMount() {
		axios.get('http://rallycoding.herokuapp.com/api/music_albums')
			.then(response => this.setState({ albums: response.data }));
	}

	renderAlbums() {
		return this.state.albums.map(album => 
			<AlbumDetail key={album.title} album = {album} />
		);
	}

	render() {
		return (
			<ScrollView style={styles.contentContainer}>
				{this.renderAlbums()}
			</ScrollView>
		);
	}
}

const styles = {
	contentContainer: {
		paddingVertical: 5
	}
};


export default AlbumList;