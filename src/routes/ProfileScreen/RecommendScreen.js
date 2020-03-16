import React from 'react'
import { Text, View, Modal, StyleSheet } from 'react-native'

export default class RecommendScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{flex:1}}>
				<Text>neirong</Text>
				<Text>neirong</Text>
				<Text>neirong</Text>
				<Text>neirong</Text>
				<Text>neirong</Text>
				</View>
				<Modal
					visible={true}
					animationType="slide"
					transparent={true}
					style={styles.modal}>
					<View style={styles.modalContent}>
						<Text>hello</Text>
						<Text>hello</Text>
						<Text>hello</Text>
						<Text>hello</Text>
					</View>
				</Modal>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	modal: {
		marginTop: 100,
		backgroundColor: 'red',
		height: 300
	},
	modalContent: {
		// marginBottom: 0,
		backgroundColor: 'green'
	}
})