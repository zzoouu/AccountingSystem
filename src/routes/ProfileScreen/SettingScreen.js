import React from 'react'
import { Text, View, Button, TouchableHighlight, Modal, Image, TextInput } from 'react-native'
import styles from './css/SettingScreenCss'
import { common } from '../../utils/commonCss'
import RightArrow from '../../components/RightArrow'
// import storage from '../../utils/storage'
import { observer, inject } from 'mobx-react'
import storage, { getUserinfo } from '../../utils/storage'
import ImagePicker from 'react-native-image-picker'
import billStore from '../../../store/BillStore'


@inject('profileStore', 'homeStore', 'budgetStore', 'billStore')
@observer
export default class SettingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			avatar: undefined,
			userinfo: undefined,
			username: undefined
		}
	}
	async componentDidMount() {
		const userinfo = await getUserinfo()
		if (userinfo) {
			this.setState({
				userinfo,
				username: userinfo ? userinfo.username : undefined,
				avatar: userinfo.avatar
			})
		}
	}
	handelExit = async () => {
		const {
			navigation,
			profileStore,
			budgetStore,
			homeStore,
			route: {
				params: {
					initUserinfo,
					initHomeRecords
				}
			} } = this.props
		await profileStore.signout()
		await storage.remove({
			key: 'userinfo'
		})
		initUserinfo()
		homeStore.getStatus()
		homeStore.getRecords()
		budgetStore.getBudgetSetting()
		billStore.getBills()
		navigation.goBack()
	}
	handelTime = e => {
		console.log('shijian')
	}
	handelCache = flag => {
		const {
			navigation,
			budgetStore,
			homeStore,
			route: {
				params: {
					initUserinfo
				}
			} } = this.props
		if (flag) {
			// 删除缓存
			storage.remove({
				key: 'userinfo'
			})
			initUserinfo()
			homeStore.getStatus()
			homeStore.getRecords()
			budgetStore.getBudgetSetting()
			navigation.goBack()
		}
		this.setShowModal(false)
	}
	setShowModal = bool => {
		this.setState({
			showModal: bool
		})
	}
	handelAvatar = e => {
		this.props.navigation.navigate('SettingAvatar')
	}
	showImagePicker = async () => {
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
		const { userinfo } = this.state
		// 回调数据
		ImagePicker.showImagePicker(options, (async response => {
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
					avatar: source
				})
				const { params } = this.props.route
				const res = await this.props.profileStore.updateUserinfo({
					_id: userinfo._id,
					avatar: response.data
				})
				storage.save({
					key: 'userinfo',
					data: {
						_id: userinfo._id,
						username: res.username,
						avatar: source
					}
				})
				params.initProfile()
			}
		}))
	}
	changeUsername = (username) => {
		this.setState({ username })
	}
	handleConfirm = async () => {
		const { params } = this.props.route
		const { username, userinfo } = this.state
		const res = await this.props.profileStore.updateUserinfo({
			_id: userinfo._id,
			username
		})
		console.log(res)
		// if (res.data.code !== -1) {

		// } else {
		// 	// 修改失败
		// 	// 内容已经存在
		// 	this.setState({
		// 		username: '用户名已存在，请更换'
		// 	})
		// }
		storage.save({
			key: 'userinfo',
			data: {
				_id: userinfo._id,
				username,
				avatar: userinfo.avatar
			}
		})
		const { homeStore, budgetStore } = this.props
		params.initProfile()
		homeStore.getRecords()
		budgetStore.getBudgetSetting()
		budgetStore.getBudgetItem()
		this.props.navigation.goBack()
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
	render() {
		const { userinfo, avatar, username } = this.state
		return (
			<View style={styles.container}>
				<TouchableHighlight
					// underlayColor='red'
					onPress={() => this.setShowModal(true)}
					style={{ marginBottom: 10 }}>
					<View style={styles.item}>
						<Text style={styles.itemText}>清空缓存</Text>
						<RightArrow style={styles.rightArrow} />

					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={e => this.handelTime(e)}>
					<View style={styles.item}>
						<Text>时间提醒</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={e => this.showImagePicker(e)}>
					<View style={styles.item}>
						<Text style={styles.itemText}>设置头像</Text>
						<Image source={avatar} style={styles.avatar} />
						<RightArrow style={styles.rightArrow} />
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={e => this.showImagePicker(e)}>
					<View style={styles.item}>
						<Text style={styles.itemText}>设置昵称</Text>
						<TextInput
							style={[{ marginRight: 10 }]}
							value={username}
							onChangeText={(text) => this.changeUsername(text)} />
					</View>
				</TouchableHighlight>
				<View style={[styles.item, styles.button, common.borderRadius]}>
					<Button
						onPress={this.handelExit}
						title='退出登录'
						color='#000000' />
				</View>
				<View style={[styles.item, styles.button, common.borderRadius, { marginTop: 10 }]}>
					<Button
						onPress={this.handleConfirm}
						title='确定'
						color='#000000' />
				</View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.showModal}
					onRequestClose={() => this.setShowModal(false)}>
					<View style={[styles.modal, common.borderRadius]}>
						<View style={styles.modalContent}>
							<View style={styles.modalMessage}>
								<Text>请确认是否删除缓存的文件?</Text>
							</View>
							<View style={styles.modalCheck}>
								<View style={styles.modalButton}>
									<Button
										title="取消"
										onPress={() => this.handelCache(false)}
									/>
								</View>
								<View style={styles.modalButton}>
									<Button
										title="确定"
										onPress={() => this.handelCache(true)}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}
