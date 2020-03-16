import React from 'react'
import { View, Text, Button, Modal, TouchableHighlight, SectionList, FlatList } from 'react-native'
import styles from './css/HomeScreenCss'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { observer, inject } from 'mobx-react'

@inject(["homeStore"]) // 注入对应的 store
@observer
class HomeScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isDatePicerVisible: false,
			date: new Date(),
			timer: undefined,
			selectedTime: undefined
		}
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
	getItemTotal = (type, data) => {
		return data
			.filter(item => item.type === type)
			.reduce((pre, cur) => pre + cur.money, 0)
	}
	getMoneyPrefix = type => {
		switch (type) {
			case 'income':
				return '+'
			default:
				return '-'
		}
	}
	render() {
		const { year, month } = this.getTime(this.state.date)
		const { itemList } = this.props.homeStore
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={[styles.iconNavigate, styles.headerItem]}>
						<Text style={[styles.font24, styles.title]}>{`${year}年${month}月`}</Text>
						<TouchableHighlight
							underlayColor="D6D6D6"
							onPress={() => this.setState({ isDatePicerVisible: true })}>
							<FontAwesome5 name="calendar-alt" size={24} color="#CD3700" />
						</TouchableHighlight>
					</View>
					<View style={[styles.flexRow, styles.headerItem]}>
						<Text style={styles.itemLabel}>剩余</Text>
						<Text style={styles.itemMoney}>2000</Text>
					</View>
					<View style={[styles.flexRow, styles.headerItem]}>
						<Text style={styles.itemLabel}>收入</Text>
						<Text style={styles.itemMoney}>2000</Text>
						<Text style={styles.itemLabel}>支出</Text>
						<Text style={styles.itemMoney}>2000</Text>
					</View>
					<View style={[styles.flexRow, { backgroundColor: '#EEAD0E', flex: 1.2 }]}>
						<View style={[styles.iconItem, { borderRightColor: '#000000', borderRightWidth: 1 }]}>
							<Text style={styles.fontIcon}>账本</Text>
							<Ionicons name="md-book" size={20} color="#AD5A5A" />
						</View>
						<View style={styles.iconItem}>
							<Text style={styles.fontIcon}>报表</Text>
							<Ionicons name="ios-pie" size={20} color="#AD5A5A" />
						</View>
					</View>
				</View>
				<FlatList
					data={itemList}
					renderItem={({ item }) => {
						const { year, month } = this.getTime(item.title)
						return (
							<View>
								<View style={styles.itemBar}>
									<Text>{`${year}年${month}月`}</Text>
									<View style={[styles.itemBarInfo]}>
										<Text style={styles.itemBarMoney}>收入:+{this.getItemTotal('income', item.data)}</Text>
										<Text style={styles.itemBarMoney}>支出:-{this.getItemTotal('pay', item.data)}</Text>
									</View>
								</View>
								{
									item.data.map(v => {
										return (
											<View style={styles.list}>
												<Ionicons style={styles.listIcon} name="ios-pie" size={20} color="#AD5A5A" />
												<Text style={styles.itemText}>{v.label}</Text>
												<Text style={styles.money}>{`${this.getMoneyPrefix(v.type)} ${v.money}`}</Text>
											</View>)
									})
								}
							</View>
						)
					}}
				/>
				{/* <SectionList
					keyExtractor={(item, index) => {
						return Math.random()
					}}
					sections={itemList}
					renderSectionHeader={item => {
						const { year, month } = this.getTime(item.section.title)
						return (
							<View style={styles.itemBar}>
								<Text>{`${year}年${month}月`}</Text>
								<View style={[styles.itemBarInfo]}>
									<Text style={styles.itemBarMoney}>收入:+{this.getItemTotal('income', item.section.data)}</Text>
									<Text style={styles.itemBarMoney}>支出:-{this.getItemTotal('pay', item.section.data)}</Text>
								</View>
							</View>
						)
					}}
					renderItem={({ item }) => {
						return (
							<View>
								<View style={styles.list}>
									<Ionicons style={styles.listIcon} name="ios-pie" size={20} color="#AD5A5A" />
									<Text style={styles.itemText}>{item.label}</Text>
									<Text style={styles.money}>{`${this.getMoneyPrefix(item.type)} ${item.money}`}</Text>
								</View>
							</View>
						)
					}}
				/> */}
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
