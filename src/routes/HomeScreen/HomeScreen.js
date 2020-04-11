import React from 'react'
import { View, Text, Button, Modal, TouchableHighlight, FlatList } from 'react-native'
import styles from './css/HomeScreenCss'
import DateTimePicker from '@react-native-community/datetimepicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { observer, inject } from 'mobx-react'
import storage, { getStorage } from '../../utils/storage'
import homeStore from '../../../store/HomeStore'

// @inject(['homeStore']) // 注入对应的 store
@inject('homeStore', 'billStore') // 注入对应的 store
@observer
class HomeScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isDatePicerVisible: false,
			date: new Date(),
			timer: undefined,
			selectedTime: undefined,
			userStatus: 2, // 0: 未登录 1: 已登录 2: 登录过期
			statusText: undefined,
			records: [],
		}
	}
	async componentDidMount() {
		await this.props.homeStore.getRecords()
		this.formatBillRecords()
		storage.save({
			key: 'user',
			data: {
				userid: 'zouzou',
				token: 'some token'
			},
			expires: 1000 * 3600 * 24 * 30
		})
		this.getStorage()
	}
	formatBillRecords = () => {
		const { records } = this.props.homeStore
		let obj = {}
		let arr = []
		let data = []
		if (records.length) {
			let flag = records[0].record_date.substr(0, 10)
			records.map((record, index) => {
				const date = record.record_date
				let time = date.substr(0, 10) // 按日划分
				// let time = date.substr(0, 7)
				data.push(record)
				if ((flag !== time) || (index === records.length - 1)) {
					obj.title = flag
					obj.data = data
					flag = time
					arr.push(obj)
					data = []
					obj = {}
				}
			})
		}
		this.setState({
			records: arr
		})
	}
	handelPickTime = () => {
		this.setState({
			isDatePicerVisible: false
		})
	}
	handleSelect = (e, date) => {
		this.setState({
			selectedTime: date
		})
	}
	getTime = date => {
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1
		}
	}
	getItemTotal = (data) => {
		let income = 0
		let pay = 0
		data.map(record => {
			const { record_type, money } = record
			if (record_type === 1) {
				income += money
			} else {
				pay += money
			}
		})
		return {
			income,
			pay
		}
	}
	sumup = () => {
		const { records } = this.state
		let income = 0
		let pay = 0
		let owe = 0
		records.map(item => {
			item.data.map(record => {
				const { money, record_type } = record
				if (record_type === 1) {
					income += money
				} else {
					pay += money
				}
			})
		})
		owe = income - pay
		return {
			income,
			pay,
			owe
		}
	}
	getMoneyPrefix = type => {
		switch (type) {
			case 1:
				return '+'
			default:
				return '-'
		}
	}
	getStorage = async () => {
		let userStatus, statusText
		try {
			const res = await storage.load({ key: 'username' })
			if (res) {
				// console.log('res', res)
				const { userid } = res
				userStatus = 1
				// getUserinfoById(userid)
			}
		} catch (e) {
			switch (e.name) {
				case 'NotFoundError':
					userStatus = 0
					statusText = '您还未登录，请点击前往登录~'
					break
				case 'ExpiredError':
					userStatus = 2
					statusText = '您的登录信息已经过期，请点击重新登录~'
					break
			}
		}
		this.setState({
			userStatus,
			statusText
		})
	}

	render() {
		const { year, month } = this.getTime(this.state.date)
		const { userStatus, statusText, records } = this.state
		const sumup = this.sumup()
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={[styles.iconNavigate, styles.headerItem]}>
						<Text style={[styles.font24, styles.title]}>{`${year}年${month}月`}</Text>
						<TouchableHighlight
							underlayColor="#D6D6D6"
							onPress={() => this.setState({ isDatePicerVisible: true })}>
							<FontAwesome5 name="calendar-alt" size={24} color="#CD3700" />
						</TouchableHighlight>
					</View>
					<View style={[styles.flexRow, styles.headerItem]}>
						<Text style={styles.itemLabel}>剩余</Text>
						<Text style={styles.itemMoney}>{sumup.owe}</Text>
					</View>
					<View style={[styles.flexRow, styles.headerItem]}>
						<Text style={styles.itemLabel}>收入</Text>
						<Text style={styles.itemMoney}>{sumup.income}</Text>
						<Text style={styles.itemLabel}>支出</Text>
						<Text style={styles.itemMoney}>{sumup.pay}</Text>
					</View>
					<View style={[styles.flexRow, { backgroundColor: '#EEAD0E', flex: 1.2 }]}>
						<TouchableHighlight
							// onPress={() => this.props.navigation.navigate('Bills', {choseType: 'show'})}
							onPress={() => this.props.navigation.navigate('BillContainer',
								{
									screen: 'Bills',
									params: { choseType: 'show' }
								})}
							underlayColor="#EEAD0E"
							style={[styles.iconItem, { borderRightColor: '#000000', borderRightWidth: 1 }]}>
							<>
								<Text style={styles.fontIcon}>账本</Text>
								<Ionicons name="md-book" size={20} color="#AD5A5A" />
							</>
						</TouchableHighlight>
						<View style={styles.iconItem}>
							<Text style={styles.fontIcon}>报表</Text>
							<Ionicons name="ios-pie" size={20} color="#AD5A5A" />
						</View>
					</View>
				</View>
				{/* 区分登录和维登录状态 */}
				{/* {
					userStatus !== 1 && (
						<TouchableHighlight onPress={() => navigation.navigate('Profile')} style={styles.unlogin}>
							<Text>{statusText}</Text>
						</TouchableHighlight>
					)
				} */}
				{
					userStatus !== 1 && (
						records.length !== 0 ?
							<FlatList
								data={records}
								renderItem={({ item }) => {
									const date = new Date(item.title)
									const year = date.getFullYear()
									const month = date.getMonth() + 1
									const day = date.getDate()
									return (
										<View
											keyExtractor={(item, index) => index.toString()}
										>
											<View style={styles.itemBar}>
												<Text>{`${year}年${month}月${day}日`}</Text>
												<View style={[styles.itemBarInfo]}>
													<Text style={styles.itemBarMoney}>收入:+{this.getItemTotal(item.data).income}</Text>
													<Text style={styles.itemBarMoney}>支出:-{this.getItemTotal(item.data).pay}</Text>
												</View>
											</View>
											{
												item.data.map(v => {
													return (
														<View style={styles.list}>
															<MaterialIcons style={styles.listIcon} name={v.icon} size={20} color="#AD5A5A" />
															<Text style={styles.itemText}>{v.record_name}</Text>
															<Text style={styles.money}>{`${this.getMoneyPrefix(v.record_type)} ${v.money}`}</Text>
														</View>)
												})
											}
										</View>
									)
								}}
							/> :
							<View style={styles.unlogin}>
								<Text>您还没有记录,请大胆的使用吧~~~</Text>
							</View>
					)
				}


				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.isDatePicerVisible}>
					<DateTimePicker
						// testID="dateTimePicker"
						value={this.state.date}
						mode="date"
						display="default"
						maximumDate={new Date(2200, 1, 1)}
						minimumDate={new Date(2020, 1, 1)}
						neutralButtonLabel="clear"
						onChange={(e, date) => this.handleSelect(e, date)}
						style={styles.dateTimePicker}
						locale="zh-Hans"
					/>
					<TouchableHighlight style={{ backgroundColor: '#EDEDED' }}>
						<Button
							title="确定"
							color="black"
							onPress={() => this.handelPickTime()} />
					</TouchableHighlight>
				</Modal>
			</View>
		)
	}
}
export default HomeScreen
