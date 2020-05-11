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
		const { flag } = this.state
		if (flag) {
			this.setState({
				flag: false,
				text: ''
			})
		} else {
			this.setState({
				text
			})
		}
	}
	handleSubmit = async () => {
		const { text, flag } = this.state
		const { profileStore, route : {
			params: {
				userinfo
			}
		} } = this.props
		console.log(userinfo)
		if (!flag) {
			this.setState({
				flag: true,
				text: '请输入您的宝贵意见'
			})
		} else {
			const res = await profileStore.postMessage({
				message: text,
				_id: userinfo._id
			})
			if(res.code === 1) {
				// 提交成功弹出框
				this.props.navigation.navigate('Profile')
			}
		}
	}
	handelClear = () => {
		this.setState({
			defaultText: '请输入您的宝贵意见',
			text: ''
		})
	}
	render() {
		const { text, flag, defaultText } = this.state
		return (
			<View style={styles.container}>
				<TextInput
					style={[styles.textinput, styles.borderRadius, flag && { color: 'red' }]}
					placeholder={this.state.defaultText}
					// placeholderTextColor
					value={this.state.text}
					multiline={true}
					// onFocus={this.handelClear}
					clearTextOnFocus={true}
					enablesReturnKeyAutomatically={true}
					// blurOnSubmit={false}
					onChangeText={text => this.handelTextChange(text)}
					onFocus={() => {this.setState({text: '', flag: false})}}
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
