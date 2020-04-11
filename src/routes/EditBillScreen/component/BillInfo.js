import React from 'react'
import { View, Text, TouchableHighlight, FlatList, Modal, Button } from 'react-native'
import { observer, inject } from 'mobx-react'
import styles from '../css/BillInfoCss'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { editRecordsList } from '../../../utils/const'

@inject(["billStore"])
@observer
class BillInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			billInfo: {},
			billRecords: [],
			isDatePicerVisible: false,
			selectedTime: undefined,
		}
	}
	componentDidMount() {
		this.getBillInfo()
		this.getRecords()
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
		this.formatBillRecords()
	}
	getBillInfo = async () => {
		await this.props.billStore.getBills()
		const { bills } = this.props.billStore
		const { bill_id } = this.props.route.params
		let res = bills.find(item => item.bill_id === bill_id)
		this.setState({billInfo: res})
		// return res
	}
	formatBillRecords = () => {
		const { billRecords } = this.props.billStore
		let obj = {}
		let arr = []
		let data = []
		if (billRecords.length) {
			let flag = billRecords[0].record_date.substr(0, 10)
			billRecords.map((record, index) => {
				const date = record.record_date
				let time = date.substr(0, 10) // 按日划分
				// let time = date.substr(0, 7)
				data.push(record)
				if ((flag !== time) || (index === billRecords.length - 1)) {
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
			billRecords: arr
		})
	}
	getMoneyPrefix = record_type => {
		// 1 收入   0 支出
		return record_type === 1 ? '+' : '-'
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
	refreshRecords = () => {
		this.getRecords()
	}
	editRecord = data => {
		const { bill_id } = this.props.route.params
		this.props.navigation.navigate('RecordInfo', {
			recordInfo: data,
			bill_id,
			refresh: this.refreshRecords.bind(this)
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
		let owe = 0
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
		owe = income - pay
		return {
			income,
			pay,
			owe,
		}
	}
	handleEditBill = item => {
		const { billInfo } = this.state
		const { setBillInfoSetting } = this.props.billStore
		switch (item.label) {
			case '分享账本':
				console.log('fenxiang')
				setBillInfoSetting(false)
				break
			case '编辑账本':
				this.props.navigation.navigate('AddBill', {
					billInfo,
					type: 'PUT',
					refresh: this.getBillInfo.bind(this)
				})
				setBillInfoSetting(false)
				break
			case '账本成员':
				this.props.navigation.navigate('BillMembers', {
					billInfo
				})
				setBillInfoSetting(false)
				break
			case '删除账本':
				this.props.billStore.deleteBillById(billInfo.bill_id)
				setBillInfoSetting(false)
				this.props.navigation.goBack()
				break
			default:
				setBillInfoSetting(false)
		}
	}
	render() {
		// const { billRecords } = this.props.billStore
		const { billRecords, billInfo, isModalVisible } = this.state
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
													return (
														<TouchableHighlight onPress={() => this.editRecord(record)}>
															<View style={styles.list}>
																{/* icon 类别记得统一处理 */}
																<MaterialIcons style={styles.listIcon} name={record.icon} size={20} color="#AD5A5A" />
																<Text style={styles.itemText}>{record.record_name}</Text>
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
									<Text style={styles.emptyText}>亲，暂时没有数据呢，请前往记录~~</Text>
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
								onPress={() => this.handelPickTime()} />
						</TouchableHighlight>
						<TouchableHighlight>
							<Button
								title="确定"
								color="black"
								onPress={() => this.handelPickTime()} />
						</TouchableHighlight>
					</View>
					<DateTimePicker
						// testID="dateTimePicker"
						value={new Date()}
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
