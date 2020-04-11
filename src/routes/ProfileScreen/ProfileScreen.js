import React from 'react'
import { View, Text, Image, FlatList, TouchableHighlight, Modal, Share } from 'react-native'
// import styles from '../indexCss'
import Util from '../../utils/deviceInfo'
import { profileList, recommendList } from '../../utils/const'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RightArrow from '../../components/RightArrow'
import styles from './css/ProfileScreenCss'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Progress from 'react-native-progress'
import storage from '../../utils/storage'
import { request, get } from '../../utils/fetch'
import { observer, inject } from 'mobx-react'

@inject(["homeStore"])
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
			loginStatus: 1,
			userinfo: undefined
		}
	}
	async componentDidMount() {
		// this.props.homeStore.getTestBill()
		// this.props.homeStore.editBillInfo()
		storage.remove({key: 'user'})
		let status, res
		try {
			res = await storage.load({
				key: 'user'
			})
			if(res) {
				const { userid } = res
				status = 0
				console.log(userid)
			}
		}catch(e) {
			status = 1
			res = undefined
		}
		this.setState({
			loginStatus: status,
			userinfo: res
		})
	}
	handlePress = (e, key) => {
		if (key === 'Recommend') {
			this.setState({
				showModal: true
			})
		} else {
			this.props.navigation.navigate('ProfileContainer', {
				screen: key
			})
		}
	}
	handleScan = () => {
		this.props.navigation.navigate('Home')
	}
	handleRecommend = async (e, label) => {
		if (label === '取消') {
			this.setState({
				showModal: 'false'
			})
		} else {
			try {
				const result = await Share.share({
					message: '这是 share 组件',
					url: 'https://weixin.qq.com/'
				})
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
						this.setState({
							shareResult: 'shared with activitytype' + result.activityType
						})
					} else {
						this.setState({
							shareResult: 'result: shared'
						})
					}
				} else if (result.action === Share.dismissedAction) {
					this.setState({
						shareResult: 'failed share'
					})
				}
			} catch (e) {
				console.log('e', e)
			}
			// console.log(this.state.shareResult)
		}
	}
	handleLogin = () => {
		const { userinfo, loginStatus } = this.state
		this.props.navigation.navigate('ProfileContainer', {
			screen: 'Regist'
		})
	}
	render() {
		const { iconSize } = this.state
		return (
			<>
				<View style={styles.container}>
					<View style={styles.head}>
						<TouchableHighlight
						underlayColor="#fff"
						style={styles.loginIcon}
						onPress={() => this.handleLogin()}>
							<Image
								style={styles.unlogin}
								resizeMethod="auto"
								source={require('./img/unlogin.png')} />
						</TouchableHighlight>
						<View style={styles.loginInfo}>
							<View style={styles.loginUser}>
								<View style={styles.loginText}>
									<Text style={styles.loginName}>邹邹</Text>
								</View>
								<View style={styles.signin}>
									<Text style={styles.signinText}>签到</Text>
									<FontAwesome name="pencil-square-o" size={20} color="#B5B5B5" />
								</View>
							</View>
							<View style={styles.progressWrapper}>
								<Progress.Bar
									progress={0.4}
									unfilledColor="#f2f2f2"
									borderRadius={10}
									borderWidth={0}
									width={Util.size.width * 0.8 - 20}
									height={8}
									style={styles.progress}
								/>
							</View>
							<View style={styles.progressInfo}>
								<Text style={styles.progressDays}>坚持几张:0天</Text>
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
					<Modal
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
					</Modal>
				</View>
			</>
		)
	}
}
export default ProfileScreen
