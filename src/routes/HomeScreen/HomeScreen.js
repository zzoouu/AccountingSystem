import React from 'react'
import { View, Text, Button, Modal, TouchableHighlight, FlatList } from 'react-native'
import styles from './css/HomeScreenCss'
import DateTimePicker from '@react-native-community/datetimepicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MyIconFont from '../../components/icon/iconfont'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { getUserinfo } from '../../utils/storage'

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
			selectedTime: new Date(),
			records: [],
			recordsByTime: [],
			userinfo: {}
		}
	}
	async componentDidMount() {
		this.props.homeStore.getStatus()
		this.initBillRecords()
		const userinfo = await getUserinfo()
		this.setState({userinfo})
		// this.formatRecordsByTime()
	}
	initBillRecords = async () => {
		await this.props.homeStore.getRecords()
		this.setState({
			records: this.props.homeStore.records
		})
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
	handelPickTime = flag => {
		this.setState({
			isDatePicerVisible: false
		})
		if (flag) {
			this.formatRecordsByTime()
			// 根据时间筛数据
		}
	}
	handleSelect = (e, date) => {
		this.setState({
			selectedTime: date
		})
	}
	getTime = date => {
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		}
	}
	getItemTotal = (data) => {
		let income = 0
		let pay = 0
		data.map(record => {
			const { record_type, money, number } = record
			if (record_type === 1) {
				income = number ===1 ? income + money : income + money / number
				// income += money
			} else {
				pay = number ===1 ? pay + money : pay + money / number
				// pay += money
			}
		})
		return {
			income,
			pay
		}
	}
	sumup = (records) => {
		// const { records } = this.state
		let income = 0
		let pay = 0
		let owe = 0
		records.length && records.map(item => {
			item.data.map(record => {
				const { money, record_type, number } = record
				if (record_type === 1) {
				income = number ===1 ? income + money : income + money / number
				// income += money
				} else {
				pay = number ===1 ? pay + money : pay + money / number
				// pay += money
				}
			})
		})
		// records.length && records.map(item => {

		// })
		owe = income - pay
		return {
			income,
			pay,
			owe
		}
	}
	getMoneyPrefix = type => {
		return type === 1 ? '+' : '-'
	}
	refreshRecords = () => {
		this.props.homeStore.getRecords()
	}
	editRecord = data => {
		this.props.navigation.navigate('BillContainer', {
			screen: 'RecordInfo',
			params: {
				recordInfo: data,
				bill_id: data.bill_id,
				refreshHomeRecords: this.initBillRecords.bind(this)
			}
		})
	}
	formatTime = date => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		return `${year}-${month.toString().padStart(2, 0)}-${day}`
	}
	formatRecordsByTime = (records) => {
		// let { records } = this.props.homeStore
		records = toJS(records)
		const { selectedTime } = this.state
		const today = new Date()
		const selectStr = this.formatTime(selectedTime)
		const todayStr = this.formatTime(today)
		let ret = []
		// console.log(today, selectedTime, records)
		if (selectStr === todayStr) {
			// 首页展示近五天记录
			ret = Array.isArray(records) ? records.slice(0, 5) : []
		} else {
			ret = records ? records.filter(item => item.title === selectStr) : []
		}
		return ret
	}
	render() {
		const { year, month } = this.getTime(this.state.date)
		const {userinfo} = this.state
		let { records, userStatus, statusText } = this.props.homeStore
		records = this.formatRecordsByTime(records)

		const sumup = this.sumup(records)
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={[styles.iconNavigate, styles.headerItem]}>
						<Text style={[styles.font24, styles.title]}>{`${year}年${month}月`}</Text>
						<TouchableHighlight
							underlayColor="#8B4726"
							onPress={() => {this.setState({ isDatePicerVisible: true })}}>
							<FontAwesome5 name="calendar-alt" size={24} color="#8B4726" />
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
					<View style={[styles.flexRow, { backgroundColor: '#FFA07A', flex: 1.2 }]}>
						<TouchableHighlight
							onPress={() => this.props.navigation.navigate('BillContainer',
								{
									screen: 'Bills',
									params: { choseType: 'show' }
								})}
							underlayColor="#FFA07A"
							style={[styles.iconItem, { borderRightColor: '#000000', borderRightWidth: 1 }]}>
							<>
								<Text style={styles.fontIcon}>账本</Text>
								<Ionicons name="md-book" size={20} color="#AD5A5A" />
							</>
						</TouchableHighlight>
						{/* <View style={styles.iconItem}> */}
						<TouchableHighlight
							style={styles.iconItem}
							underlayColor="#EEAD0E"
							onPress={() => this.props.navigation.navigate('BillContainer', {
								screen: 'Charts'
							})}
						>
							<>
								<Text style={styles.fontIcon}>报表</Text>
								<Ionicons name="ios-pie" size={20} color="#AD5A5A" />
							</>
						</TouchableHighlight>
					</View>
				</View>
				{/* 区分登录和维登录状态 */}
				{
					userStatus !== 1 && (
						<TouchableHighlight
							onPress={() => this.props.navigation.navigate('Profile', {
								initHomeRecords: this.initBillRecords.bind(this)
							})}
							style={styles.unlogin}>
							<Text>{statusText}</Text>
						</TouchableHighlight>
					)
				}
				{
					userStatus === 1 && (
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
											key={Math.random()}
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
														<TouchableHighlight onPress={() => this.editRecord(v)} key={Math.random()}>
															<View style={styles.list}>
																<MyIconFont style={styles.listIcon} name={v.icon} size={20} color="#AD5A5A" />
																<Text style={styles.itemText}>{v.record_name}</Text>
																{
																	// 若为共享账单，显示记录作者，且不显示本人，若为单人账单，则不显示记录者
																	// console.log(toJS(billInfo))
																	// v.author !== userinfo.username &&
																	v.number !== 1 &&
																	<View style={styles.authorWrapper}>
																		<MaterialIcons name="border-color" size={10} color="#838B8B" />
																		<Text style={styles.authorText}>{v.author}</Text>
																	</View>
																}
																<Text style={styles.money}>{`${this.getMoneyPrefix(v.record_type)} ${v.money}`}</Text>
															</View>
														</TouchableHighlight>)
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
					<View style={styles.dateButton}>
					<TouchableHighlight>
						<Button
							title="取消"
							color="black"
							onPress={() => this.handelPickTime(false)} />
					</TouchableHighlight>
					<TouchableHighlight>
						<Button
							title="确定"
							color="black"
							onPress={() => this.handelPickTime(true)} />
					</TouchableHighlight>
					</View>
					<DateTimePicker
						// testID="dateTimePicker"
						value={this.state.selectedTime}
						mode="date"
						display="default"
						maximumDate={new Date(2200, 1, 1)}
						minimumDate={new Date(2020, 1, 1)}
						neutralButtonLabel="clear"
						onChange={(e, date) => this.handleSelect(e, date)}
						style={styles.dateTimePicker}
						locale="zh-Hans"
					/>

				</Modal>
			</View>
		)
	}
}
export default HomeScreen
