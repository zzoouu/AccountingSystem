import React from 'react'
import { TextInput, View, Button } from 'react-native'
import styles from './css/SuggestScreenCss'
import { observer, inject } from 'mobx-react'

@inject(['profileStore'])
@observer
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
	handleSubmit = async () => {
		const { text } = this.state
		console.log(text)
		const res = await this.props.profileStore.postMessage({message: text})
		console.log(res)
		if(res.msg === 'OK') {
			// 提交成功弹出框
			this.props.navigation.navigate('Profile')
			// this.props.navigation.goBack()
		}
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
