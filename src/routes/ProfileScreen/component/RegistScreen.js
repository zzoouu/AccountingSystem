import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import styles from '../css/RegistScreenCss'
import { observer, inject } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import { post } from '../../../utils/fetch'

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
			phoneColor: false,
			avatar: undefined,
			smsCode: undefined
		}
	}
	getCaptcha = () => {
		this.setState({
			flag: false
		})
		let isPhone = (/^1[3456789]\d{9}$/.test(this.state.phone))
		if (isPhone) {
			// 获取验证码
			// this.getBomb()
		} else {
			this.setState({
				phone: '手机号码格式错误，请重新输入',
				phoneColor: true
			})
		}

	}
	// 选择图片
	showImagePicker = () => {
		const options = {
			title: '选择图片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			chooseFromLibraryButtonTitle: '图库',
			customButtons: [
			],
			cameraType: 'back',
			mediaType: 'photo',
			videoQuality: 'high',
			durationLimit: 10,
			maxWidth: 300,
			maxHeight: 300,
			quality: 0.8,
			angle: 0,
			allowsEditing: false,
			noData: false,
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		}
		// 回调数据
		ImagePicker.showImagePicker(options, (response => {
			// console.log('response: ', response)
			if (response.didCancel) {
				console.log('user canclled image picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
			} else if (response.customButton) {
				console.log('user tapped custom button', response.customButton)
			} else {
				// const source = { uri: response.uri }
				const source = { uri: 'data:image/jpeg;base64,' + response.data }
				this.setState({
					avatarUrl: source,
					avatar: response.data
				})
			}
		}))
	}
	//打开相机
	launchCamera = () => {
		//配置选项
		const options = {
			cameraType: 'front',  //前置摄像头
			mediaType: 'photo'    //进行拍照
		}

		//回调数据
		ImagePicker.launchCamera(options, (response => {
			console.log('response: ' + response)
		}))
	}
	//打开图库
	launchImageLibrary() {
		//配置选项
		const options = { mediaType: 'photo' }
		//回调数据
		ImagePicker.launchImageLibrary(options, (response => {
			console.log('response: ' + response)
		}))
	}
	veriBomb = async () => {
		const { smsCode, captcha } = this.state
		let flag
		const res = await post({
			url: `https://api2.bmob.cn/1/verifySmsCode/${captcha}`,
			headers: {
				'X-Bmob-Application-Id': '75f0265175c3f938fcdb2518bbce14ea',
				'X-Bmob-REST-API-Key': 'cbe9d337f8193b0adc4ee8930deb888c',
				// 'Content-Type': 'application/json',
			}
		})
		console.log(res)
		if (res.msg === 'ok') {
			// 验证码正确
			// 开始注册
			flag = true
		} else {
			// 验证码错误
			this.setState({
				captcha: ''
			})
			flag = false
		}
		return flag
		/**
		 * status: 200 OK
		 * body: {"msg": "ok"}
		 */
	}
	handleRegist = async () => {
		const { profileStore, navigation } = this.props
		const { username, password, phone, avatar } = this.state
		// 验证短信验证码是否正确
		// const veriBomb = await this.veriBomb()
		// if (veriBomb) {
		const res = await profileStore.regist({
			username,
			password,
			phone,
			avatar
		})
		if (res.code === 1) {
			navigation.navigate('Login')
		} else if (res.code === -1) {
			this.setState({
				phone: res.msg,
				phoneColor: true
			})
		}
		// }

	}
	getBomb = async () => {
		const { phone } = this.state
		const res = await post({
			url: 'https://api2.bmob.cn/1/requestSmsCode',
			body: {
				'mobilePhoneNumber': phone,
				// 'template': '记账1'
			},
			headers: {
				'X-Bmob-Application-Id': '75f0265175c3f938fcdb2518bbce14ea',
				'X-Bmob-REST-API-Key': 'cbe9d337f8193b0adc4ee8930deb888c',
				// 'Content-Type': 'application/json',
			}
		})
		console.log(res, 'bomb')
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
		const flag = username ? await this.props.profileStore.findUsr({ username }) : false
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
		const { username, password, r_password, phone, captcha, flag, pswColor, usrColor, rpswColor, phoneColor, avatar, avatarUrl } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.listItem}>
					<Text>用户昵称:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, usrColor && { color: 'red' }]}
						placeholder="请输入用户昵称"
						value={username}
						clearButtonMode={true}
						onChangeText={text => this.setState({ username: text })}
						onBlur={e => this.handleUsername(e)}
						onFocus={e => usrColor && this.setState({ username: '', usrColor: false })}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>登录密码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, pswColor && { color: 'red' }]}
						password={true}
						placeholder="6-16个字符，大小写字母和数字至少各一个"
						value={password}
						secureTextEntry={true}
						clearButtonMode={true}
						onChangeText={text => this.setState({ password: text })}
						onBlur={e => this.handlePassword(e)}
						onFocus={e => pswColor && this.setState({ password: '', pswColor: false })}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>确认密码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, rpswColor && { color: 'red' }]}
						placeholder="请重新输入密码"
						secureTextEntry={true}
						clearButtonMode={true}
						value={r_password}
						onChangeText={text => this.setState({ r_password: text })}
						onBlur={e => this.handleRePassword(e)}
						onFocus={() => rpswColor && this.setState({ r_password: '', rpswColor: false })}
					/>
				</View>
				<View style={styles.listItem}>
					<Text>用户头像:</Text>
					{
						avatar ? (
							<Image
								source={avatarUrl}
								style={styles.icon}
							/>
						) : (
								<>
									<TouchableOpacity onPress={() => this.showImagePicker()} style={styles.iconItem}>
										<Text style={styles.iconText}>选择图片</Text>
									</TouchableOpacity>
									{/* <TouchableOpacity onPress={() => this.launchCamera()} style={styles.iconItem}>
										<Text style={styles.iconText}>打开相机</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.launchImageLibrary()} style={styles.iconItem}>
										<Text style={styles.iconText}>打开图库</Text>
									</TouchableOpacity> */}
								</>
							)
					}
				</View>
				<View style={styles.listItem}>
					<Text>手机号码:</Text>
					<TextInput
						style={[styles.txtinput, styles.left8, phoneColor && { color: 'red' }]}
						placeholder="请输入手机号码"
						clearButtonMode={true}
						value={phone}
						onChangeText={text => this.handlePhone(text)}
						onFocus={() => phoneColor && this.setState({ phone: '', phoneColor: false })}
					/>
				</View>
				<View style={styles.listItem}>
					<TextInput
						style={[styles.captcha]}
						clearButtonMode={true}
						placeholder="请输入验证码"
						value={captcha}
						onChangeText={text => this.setState({ captcha: text })}
					/>
					<Text
						onPress={() => this.getCaptcha()}
						style={[styles.captchaText, flag && { color: 'green' }]}>获取验证码</Text>
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
