import React from 'react'
import { View, Text, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MyIconFont from '../../components/icon/iconfont'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles, progressInfo } from './css/BudgetScreenCss'
import RightArrow from '../../components/RightArrow'
import * as Progress from 'react-native-progress'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { budgetList, budgetTypeObj } from '../../utils/const'
import { getUserinfo } from '../../utils/storage'
import moment from 'moment'

const Stack = createStackNavigator()

@inject('budgetStore', 'homeStore', 'billStore') // 注入对应的 store
@observer // 监听当前组件

export class Budget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			originRecords: [],
			recordsByName: []
		}
	}
	async componentDidMount() {
		const userinfo = await getUserinfo()
		if (userinfo) {
			this.props.budgetStore.getBudgetSetting()
			await this.props.budgetStore.getBudgetItem()
			await this.props.budgetStore.setRefreshBudgets(this.initRecordsByName.bind(this))
			await this.props.billStore.getDefaultIcons()
			await this.initRecordsByName()
			let { originRecords } = this.props.homeStore
			originRecords = toJS(originRecords)
			this.setState({
				originRecords,
			})
		}
	}
	getPayMoney = () => {
		const { homeStore: { originRecords } } = this.props
		const money = originRecords.reduce((pre, cur) => {
			if (cur.record_type === 0) {
				return cur.money + pre
			} else {
				return pre
			}
		}, 0)
		return money
	}
	getType = (type = 1) => {
		const textObj = {
			0: '年',
			1: '月',
			2: '周',
		}
		return textObj[type]
	}
	getHeaderText = (type = 1) => {
		const text = `本${this.getType(type)}预算`
		return text
	}
	getItemText = (type = 1, setFlag, budgetMoney) => {
		let typeText = this.getType(type)
		let text
		if (!setFlag) {
			text = `${typeText}预算${budgetMoney}元`
		} else {
			text = `点击设置${typeText}预算`
		}
		return text
	}
	getProgress = (total) => {
		const money = this.getPayMoney()
		let ret = total === undefined ? 0 : money / total
		return ret
	}
	setBudgetItem = (label, icon, budget_type = 1, budgetId, budgetMoney) => {
		this.props.navigation.navigate('BudgetContainer', {
			screen: 'BudgetItem',
			params: {
				label,
				icon,
				budget_type,
				budget_id: budgetId,
				budget_money: budgetMoney,
				refresh: this.initRecordsByName.bind(this)
			}
		})
	}
	formatData = async () => {
		// const { budgetSettings = {} } = this.props.budgetStore
		let budgetSettings = await this.props.budgetStore.getBudgetSetting()
		budgetSettings = toJS(budgetSettings)
		let { originRecords } = this.props.homeStore
		originRecords = toJS(originRecords)
		// const { originRecords } = this.state
		let { budget_type = 1 } = budgetSettings
		// 筛选出消费的数据
		let recordsByPay = originRecords.filter(record => record.record_type === 0)
		// 先按周期筛选数据
		const now = new Date()
		const nowObj = moment(now).toObject()
		const { years, months, date } = nowObj
		// budget_type = 0
		let recordsByTime = recordsByPay.length ? recordsByPay.filter(record => {
			const timeObj = moment(record.record_date).toObject()
			let flag
			let days = moment(record.record_date, 'YYYY-MM').daysInMonth()
			switch (budget_type) {
				case 0:
					flag = timeObj.years === years
					break
				case 1:
					flag = timeObj.years === years && timeObj.months === months
					break
				case 2:
					flag = timeObj.years === years && timeObj.months === months && parseInt(timeObj.date / days) === parseInt(date / days)
					break
			}
			return flag
		}) : []
		// 按类型分类
		let recordsByName = []
		if (recordsByTime.length) {
			let obj = {}
			recordsByTime.map(record => {
				const { record_name, money, icon } = record
				if (!obj[record_name]) {
					obj[record_name] = {
						money,
						icon,
						record_name
					}
				} else {
					obj[record_name].money += money
				}
			})
			recordsByName = Object.values(obj)
		}
		// this.setState({
		// 	recordsByName
		// })
		// await this.props.budgetStore.setRecordsByName(recordsByName)
		return recordsByName
	}
	initRecordsByName = async () => {
		const recordsByName = await this.formatData()
		this.setState({
			recordsByName
		})
	}
	getItemInfo = (label, icon) => {
		const { recordsByName } = this.state
		// const recordsByName = this.formatData()
		const { budgetStore } = this.props
		const budgetItems = toJS(budgetStore.budgetItems)
		let percent = 0
		let remain = 0
		let budgetMoney
		let setFlag = true
		let budgetId
		// console.log(budgetItems, recordsByName)
		if (budgetItems.length) {
			// 获得预算金额
			let payMoney = 0
			let budgetArr = budgetItems.filter(item => item.budget_icon === icon)
			if (budgetArr.length) {
				setFlag = false
				let info = budgetArr[0]
				const { budget_money, budget_id } = info
				budgetMoney = budget_money
				// console.log(budget_money, budget_id)
				// 获得消费金额
				let payArr = recordsByName.filter(item => item.icon === icon)
				if (payArr.length) {
					payMoney = payArr[0].money
					percent = (payMoney / budgetMoney).toFixed(2)
				}
				budgetId = budget_id
				remain = budgetMoney - payMoney
			}
		}
		// console.log(budgetMoney, label, percent)
		return {
			budgetMoney,
			percent,
			remain,
			setFlag,
			label,
			budgetId
		}
	}
	render() {
		const { budgetStore, billStore } = this.props
		let { budgetSettings = {} } = budgetStore
		return (
			<ScrollView>
				<View style={styles.budgetContainer}>
					<View style={styles.header}>
						<View style={styles.number}>
							<Text style={styles.money}>{budgetSettings.total_budget || 0}</Text>
							<Text style={styles.numberText}>{this.getHeaderText(budgetSettings.budget_type)}</Text>
						</View>
						<View style={styles.progressWrapper}>
							<Progress.Bar
								progress={this.getProgress(budgetSettings.total_budget)}
								height={progressInfo.totalHeight}
								width={progressInfo.totalWidth}
								color={this.getProgress(budgetSettings.total_budget) ? 'red' : "#0080FF"}
								unfilledColor="#e0e0e0"
								borderWidth={0}
								style={styles.progress}
							/>
							<View style={styles.progressLabel}>
								<Text style={styles.progressRate}>0.0</Text>
								<Text style={[styles.progressRate, { textAlign: 'right' }]}>1.0</Text>
							</View>
						</View>
					</View>
					<View style={styles.body}>
						<FlatList
							data={toJS(billStore.payiconArr)}
							renderItem={({ item }) => {
								const res = this.getItemInfo(item.label, item.icon)
								const { budgetMoney, percent, remain, setFlag, budgetId } = res
								return (
									<View
										keyExtractor={(item, index) => index.toString()}
										style={styles.item}
										onPress={() => this.editItem()}>
										<MyIconFont
											name={item.icon}
											size={20}
											color="#FF8040"
											style={styles.itemIcon}
										/>
										<View style={styles.itemLabel}>
											<View style={styles.itemlabelText}>
												<Text>{item.label}</Text>
												{
													!setFlag &&
													<Text style={styles.remainMoney}>剩余{remain}元</Text>
												}
											</View>
											<Progress.Bar
												progress={Number(percent)}
												color={percent > 1 ? 'red' : "orange"}
												unfilledColor="#e0e0e0"
												borderWidth={0}
												width={progressInfo.itemWidth}
												style={styles.itemProgress}
											/>
											<TouchableHighlight
												style={styles.setInfo}
												underlayColor="#fff"
												onPress={() => this.setBudgetItem(item.label, item.icon, budgetSettings.budget_type, budgetId, budgetMoney)}>
												<Text style={styles.itemInfoText}>{this.getItemText(budgetSettings.budget_type, setFlag, budgetMoney)}</Text>
											</TouchableHighlight>
										</View>
										<Ionicons
											color={'#d3d7d4'}
											name={'ios-arrow-forward'}
											size={20}
											style={styles.itemIcon}
											onPress={() => this.setBudgetItem(item.label, item.icon, budgetSettings.budget_type, budgetId, budgetMoney)}
										/>
									</View>
								)
							}}
						/>
					</View>
				</View>
			</ScrollView>
		)
	}
}

@inject(["budgetStore"]) // 注入对应的 store
@observer
class BudgetScreen extends React.Component {
	constructor(props) {
		super(props)
	}
	handelSettingBudget = () => {
		const { navigation } = this.props
		navigation.navigate('BudgetContainer', {
			screen: 'BudgetSetting',
			params: {
				// navigation,
				// init: this.initScreen.bind(this)
			}
		})
	}
	render() {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="BudgetStack"
					component={Budget}
					options={{
						title: '预算',
						headerRight: () => <MaterialCommunityIcons onPress={this.handelSettingBudget} name="settings-outline" size={20} color="#6A6AFF" />,
						headerRightContainerStyle: {
							marginRight: 10
						}
					}}
				/>
			</Stack.Navigator>
		)
	}
}
export default BudgetScreen
