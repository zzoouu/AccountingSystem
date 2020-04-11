import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import styles from '../css/LoginScreenCss'
import { observer, inject } from 'mobx-react'

@inject('profileStore')
@observer
class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: undefined,
			password: undefined,
			warnText: undefined
		}
	}
	handleLogin = async () => {
		const { username, password } = this.state
		const { profileStore, navigation } = this.props
		const res = await profileStore.login({username, password})
		if (res.code === -1) {
			this.setState({
				username: undefined,
				password: undefined,
				warnText: res.msg
			})
		} else {
			// 成功状态
			navigation.navigate('Profile', {
				_id: res._id,
				username
			})
		}

	}
	handleInput = (type, value) => {
		const { warnText } = this.state
		this.setState({
			type: value
		})
		if (warnText) {
			this.setState({
				warnText: undefined
			})
		}
	}

  render() {
		const { username, password, warnText } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.listItem}>
					<Text>昵称:</Text>
					<TextInput
						style={[styles.txtInput]}
						placeholder="请输入用户昵称"
						value={username}
						onChangeText={text => this.handleInput('username', text)}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>密 码:</Text>
					<TextInput
						style={[styles.txtInput]}
						placeholder="请输入用户昵称"
						value={password}
						onChangeText={text => this.handleInput('password', text)}
					/>
				</View>
				{
					warnText && (
						<View style={styles.warn}>
							<Text style={{color: 'red', fontSize: 12}}>{warnText}</Text>
						</View>
					)
				}
				<View style={styles.button}>
					<Button
						title="登录"
						color="black"
						onPress={() => this.handleLogin()}
					/>
				</View>
			</View>
		)
	}
}
export default LoginScreen

