import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styles from '../css/RegistScreenCss'
import { observer, inject } from 'mobx-react'

@inject('profileStore')
@observer
class RegistScreen extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			username: undefined,
			password: undefined,
			r_password: undefined,
			phone: undefined,
			captcha: undefined,
			flag: false,
			pswColor: false,
			usrColor: false,
			rpswColor: false,
			phoneColor: false
		}
	}
	getCaptcha = () => {
		this.setState({
			flag: false
		})
	}
	handleRegist = async () => {
		const { profileStore, navigation } = this.props
		const { username, password, phone } = this.state
		const res = await profileStore.regist({
			username,
			password,
			phone
		})
		if (res.code === 1) {
			navigation.navigate('Login')
		} else if (res.code === -1) {
			this.setState({
				phone: res.msg,
				phoneColor: true
			})
		}
	}
	handlePassword = e => {
		const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/)
		const flag = reg.test(e.nativeEvent.text)
		!flag && e.nativeEvent.text && this.setState({
			password: '6-16个字符，大小写字母和数字至少各一个',
			pswColor: !flag
		})
	}
	handleRePassword = e => {
		const text = e.nativeEvent.text
		const { password } = this.state
		const flag = text === password ? true : false
		!flag && text && this.setState({
			rpswColor: !flag,
			r_password: '您的密码错误，请重新输入'
		})
	}
	handleUsername = async e => {
		const { text } = e.nativeEvent
		const { username } = this.state
		const flag = username ? await this.props.profileStore.findUsr({username}) : false
		flag && this.setState({
			usrColor: flag,
			username: '用户昵称已经存在，请重新输入'
		})
	}
	handlePhone = text => {
		const { phoneColor } = this.state
		this.setState({
			phone: text,
			flag: true
		})
		if (phoneColor) {
			this.setState({
				phone: undefined,
				phoneColor: false
			})
		}
	}
	render() {
		const { username, password, r_password, phone, captcha, flag, pswColor, usrColor, rpswColor, phoneColor } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.listItem}>
					<Text>用户昵称:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, usrColor && { color: 'red'}]}
						placeholder="请输入用户昵称"
						value={username}
						onChangeText={text => this.setState({username: text})}
						onBlur={e => this.handleUsername(e)}
						onFocus={e => usrColor && this.setState({username: '', usrColor: false})}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>登录密码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, pswColor && {color: 'red'}]}
						placeholder="6-16个字符，大小写字母和数字至少各一个"
						value={password}
						onChangeText={text => this.setState({password: text})}
						onBlur={e => this.handlePassword(e)}
						onFocus={e => pswColor && this.setState({password: '', pswColor: false})}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>确认密码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, rpswColor && {color: 'red'}]}
						placeholder="请重新输入密码"
						value={r_password}
						onChangeText={text => this.setState({r_password: text})}
						onBlur={e => this.handleRePassword(e)}
						onFocus={() => rpswColor && this.setState({r_password: '', rpswColor: false})}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>手机号码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, phoneColor && { color: 'red' }]}
						placeholder="请输入手机号码"
						value={phone}
						onChangeText={text => this.handlePhone(text)}
						onFocus={() => phoneColor && this.setState({phone: '', phoneColor: false})}
					/>
				</View>
				<View style={styles.listItem}>
					<TextInput
						style={[styles.captcha]}
						placeholder="请输入验证码"
						value={captcha}
						onChangeText={text => this.setState({captcha: text})}
						/>
					<Text
						onPress={() => this.getCaptcha()}
						style={[styles.captchaText, flag && { color: 'green'}]}>获取验证码</Text>
				</View>
				<View style={styles.button}>
					<Button
						title="注册"
						color="black"
						onPress={() => this.handleRegist()}
					/>
				</View>
			</View>
		)
	}
}
export default RegistScreen
