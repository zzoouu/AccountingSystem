import React from 'react'
import { View, Text, Modal, TouchableHighlight, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { observer, inject } from 'mobx-react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { numKeyboard } from '../../utils/const'


import styles from './css/EditBillScreenCss'
import { TextInput } from 'react-native-gesture-handler'
const Tab = createMaterialTopTabNavigator()

@inject(["billStore"])
@observer
class IncomeScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
			numValue: '',
			nums: [],
			note: undefined,
			dateModalVisible: false,
			date: new Date(),
			choseText: '请选择账本',
			billId: undefined,
			billName: undefined,
			selectedIcon: undefined,
			flag: undefined
		}
	}
	componentDidMount() {
		this.setState({
			flag: this.props.route.name
		})
	}
	editBillRecord = () => {
		const { numValue, note, billId, selectedIcon, flag } = this.state
		if (billId && numValue) {
			this.props.billStore.editBillRecord({
				bill_id: billId,
				record_name: selectedIcon.label,
				money: Number(numValue),
				desc: note,
				record_type: flag === 'Income' ? 1 : 0,
				icon: selectedIcon.icon
			})
		} else {
			console.log('reject')
		}
	}

	handelNum = item => {
		let { numValue, nums } = this.state
		switch (item) {
			case '=':
				let value = eval(nums.join(''))
				this.setState({
					numValue: value.toString()
				})
				return
			case '取消':
				this.setState({
					numValue: numValue.substring(0, numValue.length - 1)
				})
				return
			case 'OK':
				this.setState({
					modalVisible: false
				})
				this.editBillRecord()
			default:
				nums.push(item)
				this.setState({
					numValue: numValue + item,
					nums
				})
		}
	}
	handelNote = text => {
		this.setState({
			note: text
		})
	}
	handelIconItem = item => {
		this.setState({
			modalVisible: true,
			numValue: '',
			selectedIcon: item
		})
	}
	handleSelect = (e, date) => {
		// console.log(date)
	}
	handleSelectDate = flag => {
		this.setState({
			dateModalVisible: false
		})
	}
	handelSelectBill = () => {
		// this.props.navigation.navigate('Bills', { choseType: 'select', getBillParams: this.getBillParams.bind(this) })
		this.props.navigation.navigate('BillContainer', {
			screen: 'Bills',
			params: {
				choseType: 'select',
				getBillParams: this.getBillParams.bind(this)
			}
		})
	}
	getBillParams = ({ bill_id, bill_name }) => {
		this.setState({
			billName: bill_name,
			billId: bill_id,
			choseText: bill_name
		})
	}
	render() {
		const { billStore } = this.props
		const { consumptionTags = [] } = billStore
		return (
			<View style={styles.container}>
				<View style={styles.tabItem}>
					<TouchableHighlight
						underlayColor="#ffffff"
						onPress={() => this.setState({ dateModalVisible: !this.state.dateModalVisible })}
						style={styles.tabArrow}>
						<View style={styles.tabArrow}>
							<Text style={[styles.font12]}>今天</Text>
							<Ionicons style={styles.icon} name="ios-arrow-down" size={20} color="#000000" />
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#ffffff"
						style={styles.choseBill}
						onPress={() => this.handelSelectBill()}>
						<View style={styles.choseBill}>
							<Text style={[styles.font12]}>{this.state.choseText}</Text>
							<Ionicons name="ios-paper" size={18} color="#000000" style={styles.icon} />
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.iconTags}>
					<FlatList
						data={consumptionTags}
						contentContainerStyle={styles.flatList}
						horizontal={false}
						renderItem={({ item, index }) => {
							return (
								<View
									keyExtractor={(item, index) => Math.random()}
									style={styles.iconItem}>
									<TouchableHighlight
										style={styles.iconBack}
										underlayColor='#ffa500'
										onPress={() => this.handelIconItem(item)}>
										<MaterialIcons name={item.icon} size={30} color="#EE7942" />
									</TouchableHighlight>
									<Text style={styles.iconText}>{item.label}</Text>
								</View>
							)
						}}
					/>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={styles.modal}>
						<View style={styles.modalHead}>
							<View style={styles.headNote}>
								<Text>备注:</Text>
								<TextInput
									placeholder="10个字以内"
									style={{ marginLeft: 4 }}
									onEndEditing={(e) => console.log(e.nativeEvent.text)}
								// onChangeText={text => this.handelNote(text)}
								/>
							</View>
							<TextInput style={styles.headValue} defaultValue="0" value={this.state.numValue} editable={false} />
						</View>
						{/* <View style={styles.modalBody}>
						</View> */}
						<FlatList
							data={numKeyboard}
							horizontal={false}
							numColumns={4}
							renderItem={({ item, index }) => {
								return (
									<TouchableHighlight
										onPress={() => this.handelNum(item.label)}
										underlayColor='#f2f2f2'
										keyExtractor={(item, index) => Math.random()}
										style={[styles.num, ((index + 1) % 4 === 0) && { borderRightWidth: 0 }]}>
										<Text>{item.label}</Text>
									</TouchableHighlight>
								)
							}}
						/>
					</View>
				</Modal>
				<Modal
					transparent={true}
					animationType="slide"
					visible={this.state.dateModalVisible}>
					<View style={styles.dateModal}>
						<View style={styles.dateModalHead}>
							<TouchableHighlight onPress={() => this.handleSelectDate(true)}>
								<Text>确定</Text>
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.handleSelectDate(false)}>
								<Text>取消</Text>
							</TouchableHighlight>
						</View>
						<DateTimePicker
							value={this.state.date}
							mode="date"
							display="default"
							maximumDate={new Date(2200, 1, 1)}
							minimumDate={new Date(2020, 1, 1)}
							neutralButtonLabel="clear"
							onChange={(e, date) => this.handleSelect(e, date)}
							locale="zh-Hans"
							style={styles.dateModalTime}
						/>
					</View>
				</Modal>
			</View>
		)
	}
}

// class EditBillScreen extends React.Component {
function EditBillScreen() {
	// render() {
	return (
		<Tab.Navigator
			initialRouteName="Income"
			tabBarOptions={{
				tabStyle: {
					height: 50
				},
				labelStyle: {
					fontSize: 14
				}
			}}
		>
			<Tab.Screen
				name="Income"
				component={IncomeScreen}
				options={{
					tabBarLabel: '收入'
				}}
				listeners={{
					tabPress: e => {
						console.log(1)
					}
				}}
			/>
			<Tab.Screen
				name="pay"
				component={IncomeScreen}
				options={{
					tabBarLabel: '支出'
				}}
				listeners={{
					tabPress: e => {
						console.log(2)
					}
				}}
			/>
		</Tab.Navigator>
	)
	// }
}
export default EditBillScreen
