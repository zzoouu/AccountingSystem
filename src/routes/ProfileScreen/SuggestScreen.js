import React from 'react'
import { TextInput, View, Button, StyleSheet } from 'react-native'

export default class SuggestScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultText: '请输入您的宝贵意见',
			text: ''
		}
	}
	handelTextChange(text) {
		console.log(text)
		this.setState({
			text
		})
	}
	handleSubmit = () => {
		console.log(this.state)
	}
	handelClear = () => {
		console.log('clear')
		this.setState({
			defaultText: '请输入您的宝贵意见',
			text: ''
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={[styles.textinput, styles.borderRadius]}
					placeholder={this.state.defaultText}
					// placeholderTextColor
					value={this.state.text}
					multiline={true}
					// onFocus={this.handelClear}
					clearTextOnFocus={true}
					enablesReturnKeyAutomatically={true}
					// blurOnSubmit={false}
					onChangeText={text => this.handelTextChange(text)}
				/>
				<View style={[styles.button, styles.borderRadius]}>
				<Button
					onPress={this.handleSubmit}
					title='提交'
					color='#000000'
				/>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		alignItems: 'center',
		backgroundColor: '#fffffb'
	},
	textinput: {
		width: 340,
		height: 200,
		borderColor: '#999d9c',
		borderWidth: 1,
		textAlignVertical: 'top'
	},
	button: {
		backgroundColor: '#fcaf17',
		width: 342,
		height: 50,
		marginTop: 20,
		flex: 0,
		justifyContent: 'center'
	},
	borderRadius: {
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	}
})