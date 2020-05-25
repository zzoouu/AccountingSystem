import React from 'react'
import { View, Text, Image, FlatList, TouchableHighlight, Modal, Share } from 'react-native'
// import styles from '../indexCss'
import Util from '../../utils/deviceInfo'
import { profileList, recommendList } from '../../utils/const'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MyIconFont from '../../components/icon/iconfont'
import RightArrow from '../../components/RightArrow'
import styles from './css/ProfileScreenCss'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Progress from 'react-native-progress'
import storage from '../../utils/storage'
import { request, get } from '../../utils/fetch'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@inject('homeStore', 'profileStore')
@observer
class ProfileScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deviceWith: Util.size.width,
			deviceHeight: Util.size.height,
			iconSize: 20,
			showModal: false,
			shareResult: '',
			loginStatus: 0,
			userinfo: {},
			flag: false,
			signFlag: false,
			num: undefined
		}
	}
	async componentDidMount() {
		// storage.remove({key: 'user'})
		// 解决签到加减设置，当天初始签到条件， 时间对比有问题，
		this.getUserinfo()
		const res = await this.props.profileStore.getSignDays()
		if (res.code === 1) {
			let { sign_days, lastdate } = res.data
			sign_days = (sign_days === undefined || sign_days === null) ? 0 : sign_days
			let flag = sign_days && lastdate && this.compareDate(lastdate, new Date()) ? true : false
			// let flag = (!(!lastdate) || (!sign_days)) ? false : this.compareDate(lastdate, new Date())
			this.setState({
				sign_days,
				signFlag: flag,
				num: flag ? 1 : 0
			})
		}
	}
	compareDate = (lastdate, date) => {
		let ret
		if (lastdate) {
			lastdate = new Date(lastdate)
			const newYear = date.getFullYear()
			const newMonth = date.getMonth()
			const newDate = date.getDate()
			const oldYear = lastdate.getFullYear()
			const oldMonth = lastdate.getMonth()
			const oldDate = lastdate.getDate()
			ret = newYear === oldYear && newMonth === oldMonth && oldDate === newDate
		}
		return ret
	}
	getUserinfo = async () => {
		let status, res
		try {
			res = await storage.load({
				key: 'userinfo'
			})
			status = res ? 1 : 0
			console.log(res,'userinfo')
			this.setState({
				loginStatus: status,
				userinfo: res
			})
		} catch (e) {
			console.log('profile', e)
			status = 0
			res = {}
			this.setState({
				loginStatus: status,
				userinfo: res
			})
		}
	}
	handlePress = (e, key) => {
		if (key === 'Recommend') {
			// this.setState({
			// 	showModal: true
			// })
			this.props.navigation.navigate('ProfileContainer', {
				screen: 'Recommend',
			})
		} else {
			const { navigation, route: {
				params
			} } = this.props
			navigation.navigate('ProfileContainer', {
				screen: key,
				params: {
					initUserinfo: this.getUserinfo.bind(this),
					userinfo: this.state.userinfo,
					initHomeRecords: params && params.initHomeRecords,
					initProfile: this.getUserinfo.bind(this)
				}
			})
		}
	}
	handleScan = () => {
		this.props.navigation.navigate('Home')
	}
	handleRecommend = async (e, label) => {
		this.props.navigation.navigate('Recommend')
		// if (label === '取消') {
		// 	this.setState({
		// 		showModal: 'false'
		// 	})
		// } else {
		// 	try {
		// 		const result = await Share.share({
		// 			message: '这是 share 组件',
		// 			url: 'https://weixin.qq.com/'
		// 		})
		// 		if (result.action === Share.sharedAction) {
		// 			if (result.activityType) {
		// 				this.setState({
		// 					shareResult: 'shared with activitytype' + result.activityType
		// 				})
		// 			} else {
		// 				this.setState({
		// 					shareResult: 'result: shared'
		// 				})
		// 			}
		// 		} else if (result.action === Share.dismissedAction) {
		// 			this.setState({
		// 				shareResult: 'failed share'
		// 			})
		// 		}
		// 	} catch (e) {
		// 		console.log('e', e)
		// 	}
		// 	// console.log(this.state.shareResult)
		// }
	}
	handleLogin = () => {
		const { navigation, route: {
			params
		} } = this.props
		navigation.navigate('ProfileContainer', {
			screen: 'LoginRegist',
			params: {
				screen: 'Login',
				params: {
					initUserinfo: this.getUserinfo.bind(this),
					initHomeRecords: params && params.initHomeRecords
				}
			}
		})
	}
	getUserText = () => {
		const { userinfo } = this.state
		if (userinfo && userinfo.username) {
			return userinfo.username
		} else {
			return '小主还未登录，请点击头像登录~'
		}
	}
	getProgress = (sign_days) => {
		const { loginStatus } = this.state
		sign_days = sign_days ? sign_days : 0
		if (loginStatus) {
			const date = new Date()
			const totalDays = moment(date, 'YYYY-MM').daysInMonth()
			const per = (sign_days / totalDays).toFixed(2)
			return per
		} else {
			return 0
		}
	}
	handleSign = async () => {
		let num = this.state.num + 1
		// 1 +1 0 -1
		const res = await this.props.profileStore.editSignDays({ flag: num % 2 })
		this.setState({
			signFlag: !this.state.signFlag,
			sign_days: res.sign_days,
			num
		})
	}
	render() {
		const { iconSize, userinfo, loginStatus, sign_days, signFlag } = this.state
		return (
			<>
				<View style={styles.container}>
					<View style={styles.head}>
						<TouchableHighlight
							underlayColor="#fff"
							style={styles.loginIcon}
							onPress={() => this.handleLogin()}>
							{
								userinfo.avatar ? (
									<Image
										style={styles.unlogin}
										resizeMethod="auto"
										source={userinfo.avatar} />
								) : (
										<Image
											style={styles.unlogin}
											resizeMethod="auto"
											source={require('./img/unlogin.png')} />
									)
							}

						</TouchableHighlight>
						<View style={styles.loginInfo}>
							<View style={styles.loginUser}>
								<View style={styles.loginText}>
									<Text style={[styles.loginName, !loginStatus && { color: '#8B8878' }]}>{this.getUserText()}</Text>
								</View>
								<View style={styles.signin}>
									<Text style={styles.signinText}>签到</Text>
									<FontAwesome name="pencil-square-o" size={20} color={signFlag ? '#D94600' : '#8B8878'} onPress={() => this.handleSign()} />
								</View>
							</View>
							<View style={styles.progressWrapper}>
								<Progress.Bar
									progress={Number(this.getProgress(sign_days))}
									unfilledColor="#f2f2f2"
									borderRadius={10}
									borderWidth={0}
									width={Util.size.width * 0.8 - 20}
									height={8}
									style={styles.progress}
								/>
							</View>
							<View style={styles.progressInfo}>
								<Text style={styles.progressDays}>本月坚持天数:{sign_days}天</Text>
							</View>
						</View>
					</View>
					<View style={styles.main}>
						<FlatList
							data={profileList}
							renderItem={({ item }) => {
								return (
									<TouchableHighlight
										keyExtractor={(item) => Math.random()}
										onPress={e => this.handlePress(e, item.key)}>
										<View style={styles.listItem}>
											<Ionicons
												name={item.icon}
												size={iconSize}
												color={item.color}
												style={styles.itemIcon}
											/>
											<Text style={styles.itemLabel}>{item.label}</Text>
											<RightArrow />
										</View>
									</TouchableHighlight>
								)
							}}
						/>
					</View>
					{/* <Modal
						style={styles.modal}
						animationType="slide"
						transparent={true}
						visible={this.state.showModal}>
						<View style={styles.modalContent}>
							<FlatList
								data={recommendList}
								renderItem={({ item, index }) => {
									return (
										<TouchableHighlight
											keyExtractor={(item, index) => index.toString()}
											onPress={e => this.handleRecommend(e, item.label)}>
											<View style={styles.recommendItem}>
												<Text>{item.label}</Text>
											</View>
										</TouchableHighlight>
									)
								}}
							/>
						</View>
					</Modal> */}
				</View>
			</>
		)
	}
}
export default ProfileScreen
