import React from 'react'
import { View, Text, TouchableHighlight, FlatList, Modal, Button } from 'react-native'
import { observer, inject } from 'mobx-react'
import styles from '../css/BillInfoCss'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { editRecordsList } from '../../../utils/const'
import { getUserinfo } from '../../../utils/storage'
import { toJS } from 'mobx'
import MyIconFont from '../../../components/icon/iconfont'

@inject(["billStore"])
@observer
class BillInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			billInfo: {},
			billRecords: [],
			isDatePicerVisible: false,
			selectedTime: new Date(),
			userinfo: undefined,
			warnText: '亲，暂时没有数据呢，请前往记录~~'
		}
	}
	async componentDidMount() {
		await this.getBillInfo()
		this.getRecords()
		const userinfo = await getUserinfo()
		this.setState({
			userinfo
		})
	}
	async getRecords() {
		const {
			route: {
				params: {
					bill_id
				}
			},
			billStore
		} = this.props
		await billStore.getBillById(bill_id)
		this.formatBillRecords(billStore.billRecords)
	}
	getBillInfo = async () => {
		// await this.props.billStore.getBills()
		// const { bills } = this.props.billStore
		// const { bill_id } = this.props.route.params
		// let res = await bills.find(item => item.bill_id === bill_id)
		// this.setState({ billInfo: res })
		const { billStore, route: {
			params
		} } = this.props
		await billStore.getBillInfoById(params.bill_id)
		this.setState({
			billInfo: billStore.billInfo
		})
		// return res
	}
	formatTime = date => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		return `${year}-${month.toString().padStart(2, 0)}-${day}`
	}
	formatBillRecords = (billRecords) => {
		// const { billRecords } = this.props.billStore
		let obj = {}
		let arr = []
		let data = []
		billRecords = toJS(billRecords)
		if (billRecords.length) {
			let flag = billRecords[0].record_date.substr(0, 10)
			billRecords.map((record, index) => {
				const date = record.record_date
				let time = date.substr(0, 10) // 按日划分
				// let time = date.substr(0, 7)
				data.push(record)
				if ((flag !== time) || (index === billRecords.length - 1)) {
					obj.title = flag
					obj.data = data.slice(0, data.length - 1)
					flag = time
					arr.push(obj)
					data = []
					obj = {}
				}
			})
		}
		this.setState({
			billRecords: arr
		})
	}
	getMoneyPrefix = record_type => {
		// 1 收入   0 支出
		return record_type === 1 ? '+' : '-'
	}
	handelPickTime = (flag) => {
		this.setState({
			isDatePicerVisible: false
		})
		if (flag) {
			this.formatRecordsByTime()
		}
	}
	formatRecordsByTime = () => {
		let { billRecords } = this.props.billStore
		billRecords = toJS(billRecords)
		const { selectedTime } = this.state
		const today = new Date()
		const selectStr = this.formatTime(selectedTime)
		const todayStr = this.formatTime(today)
		let ret = []
		let warnText
		if (selectStr === todayStr) {
			// 首页展示近五天记录
			// ret = billRecords.slice(0, 20)
			ret = billRecords
			warnText = '亲，暂时没有数据呢，请前往记录~~'
		} else {
			ret = billRecords ? billRecords.filter(item => {
				return item.record_date.substr(0, 10) === selectStr}) : []
			}
			warnText = '亲，当天没有记录呢~~'
		this.setState({
			warnText
		})
		this.formatBillRecords(ret)
	}
	handleSelect = (e, date) => {
		this.setState({
			selectedTime: date
		})
	}
	editRecord = data => {
		const { bill_id } = this.props.route.params
		this.props.navigation.navigate('RecordInfo', {
			recordInfo: data,
			bill_id,
			refresh: this.getRecords.bind(this)
		})
	}
	handleEmpty = () => {
		const { navigation } = this.props
		navigation.navigate('StackHome', {
			screen: 'EditBill'
		})
	}
	sumup = () => {
		const { billRecords } = this.state
		let income = 0
		let pay = 0
		billRecords.map(item => {
			item.data.map(record => {
				const { money, record_type } = record
				if (record_type === 1) {
					income += money
				} else {
					pay += money
				}
			})
			item.total = {
				income,
				pay
			}
		})
		let income2 = 0
		let pay2 = 0
		let owe2 = 0
		billRecords.map(item => {
			income2 += item.total.income
			pay2 += item.total.pay
		})
		owe2 = income2 - pay2
		return {
			income: income2,
			pay: pay2,
			owe: owe2,
		}
	}
	handleEditBill = async item => {
		const { billInfo } = this.state
		const {
			billStore: {
				setBillInfoSetting,
				deleteBillById
			},
			navigation
		} = this.props
		const userinfo = await getUserinfo()
		switch (item.label) {
			case '分享账本':
				const { bill_id, members, isShared } = billInfo
				navigation.navigate('Share', {
					bill_id,
					members,
					isShared
				})
				setBillInfoSetting(false)
				break
			case '编辑账本':
				navigation.navigate('AddBill', {
					billInfo,
					type: 'PUT',
					refresh: this.getBillInfo.bind(this)
				})
				setBillInfoSetting(false)
				break
			case '账本成员':
				navigation.navigate('BillMembers', {
					billInfo
				})
				setBillInfoSetting(false)
				break
			case '删除账本':
				deleteBillById({
					bill_id: billInfo.bill_id,
					author: userinfo.username,
					members: billInfo.members
				})
				setBillInfoSetting(false)
				navigation.navigate('BillInfo')
				break
			default:
				setBillInfoSetting(false)
		}
	}
	render() {
		// const { billRecords } = this.props.billStore
		const { billRecords, billInfo, isModalVisible, userinfo, warnText } = this.state
		const sumup = this.sumup()
		return (
			<View style={styles.container}>
				<View style={[styles.head,]}>
					<View style={styles.billInfo}>
						<View style={styles.billName}>
							<Text style={styles.billNameText}>{`账单名称: ${billInfo.bill_name}`}</Text>
							<View style={[styles.billColor, { backgroundColor: billInfo.color }]}></View>
						</View>
						<TouchableHighlight
							underlayColor="#D6D6D6"
							onPress={() => this.setState({ isDatePicerVisible: true })}>
							<FontAwesome5 name="calendar-alt" size={20} color="#fff" />
						</TouchableHighlight>
					</View>
					<View style={styles.billMoney}>
						<Text style={styles.billMoneyText}>收入: {sumup.income}</Text>
						<Text style={styles.billMoneyText}>支出: {sumup.pay}</Text>
						<Text style={styles.billMoneyText}>结余: {sumup.owe}</Text>
					</View>
				</View>
				<View style={styles.records}>
					{
						billRecords.length ? (
							<FlatList
								data={billRecords}
								renderItem={({ item }) => {
									const date = new Date(item.title)
									const year = date.getFullYear()
									const month = date.getMonth() + 1
									const day = date.getDate()
									return (
										<View keyExtractor={({ item, index }) => index.toString()}>
											<View style={styles.itemBar}>
												<Text>{year}年{month}月{day}日</Text>
												<View style={styles.itemBarInfo}>
													<Text style={styles.itemBarMoney}>收入: +{item.total.income}</Text>
													<Text style={styles.itemBarMoney}>支出: -{item.total.pay}</Text>
												</View>
											</View>
											{
												item.data.map(record => {
													const info = toJS(billInfo)
													const members = info.members.split(',')
													const iconShow = members.length > 1
													return (
														<TouchableHighlight onPress={() => this.editRecord(record)}>
															<View style={styles.list}>
																<MyIconFont style={styles.listIcon} name={record.icon} size={20} color="#AD5A5A" />
																<Text style={styles.itemText}>{record.record_name}</Text>
																{
																	// 若为共享账单，显示记录作者，且不显示本人，若为单人账单，则不显示记录者
																	// console.log(toJS(billInfo))
																	iconShow && record.author !== userinfo.username &&
																	<View style={styles.authorWrapper}>
																		<MaterialIcons name="border-color" size={10} color="#838B8B" />
																		<Text style={styles.authorText}>{record.author}</Text>
																	</View>
																}
																<Text style={styles.money}>{`${this.getMoneyPrefix(record.record_type)} ${record.money}`}</Text>
															</View>
														</TouchableHighlight>
													)
												})
											}
										</View>
									)
								}}
							/>
						) : (
								<TouchableHighlight style={styles.empty} underlayColor='#f2f2f2' onPress={() => this.handleEmpty()}>
									<Text style={styles.emptyText}>{warnText}</Text>
								</TouchableHighlight>
							)
					}
				</View>
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
				<Modal
					style={styles.modal}
					animationType="slide"
					transparent={true}
					visible={this.props.billStore.settingShow}>
					<View style={styles.modalContent}>
						<FlatList
							data={editRecordsList}
							renderItem={({ item, index }) => {
								return (
									<TouchableHighlight
										keyExtractor={(item, index) => index.toString()}
										onPress={e => this.handleEditBill(item)}>
										<View style={styles.editRecordItem}>
											<Text>{item.label}</Text>
										</View>
									</TouchableHighlight>
								)
							}}
						/>
					</View>
				</Modal>
			</View>
		)
	}
}
export default BillInfo
