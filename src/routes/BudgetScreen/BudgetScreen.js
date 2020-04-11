import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles, progressInfo } from './css/BudgetScreenCss'
import RightArrow from '../../components/RightArrow'
import * as Progress from 'react-native-progress'
import { observer, inject } from 'mobx-react'
import { budgetList } from '../../utils/const'

const Stack = createStackNavigator()

@inject(["budgetStore"]) // 注入对应的 store
@observer // 监听当前组件

export class Budget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			progress: 0.3,
			budget: 2000,
			total_budget: 0
		}
	}
	componentDidMount(){
		this.props.budgetStore.getBudgetSetting()
	}
	getBudget = (type, number) => {
	}
	getType = (type = 1) => {
		const textObj = {
			0: '年',
			1: '月',
			2: '周',
		}
		return textObj[type]
	}
	getItemProgress = (type, item) => {
		return 0.4
	}
	getHeaderText = (type = 1) => {
		const text = `本${this.getType(type)}剩余预算`
		return text
	}
	getItemText = (type = 'month', budget) => {
		let typeText = this.getType(type)
		let text
		if (budget) {
			text = `${typeText}预算${budget}`
		} else {
			text = `点击设置${typeText}预算`
		}
		return text
	}
	editItem = () => { }
	render() {
		const { progress } = this.state
		const { budgetStore } = this.props
		const { budgetSettings={} } = budgetStore

		return (
			<ScrollView>
				<View style={styles.budgetContainer}>
					<View style={styles.header}>
						<View style={styles.number}>
							<Text style={styles.money}>{budgetSettings.total_budget}</Text>
							<Text style={styles.numberText}>{this.getHeaderText(budgetSettings.budget_type)}</Text>
						</View>
						<View style={styles.progressWrapper}>
							<Progress.Bar
								progress={progress}
								height={progressInfo.totalHeight}
								width={progressInfo.totalWidth}
								color="#0080FF"
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
							data={budgetList}
							renderItem={({ item }) => {
								return (
									<View
										keyExtractor={(item) => Math.random()}
										style={styles.item}
										onPress={() => this.editItem()}>
										<MaterialCommunityIcons
											name={item.icon}
											size={20}
											color="orange"
											style={styles.itemIcon}
										/>
										<View style={styles.itemLabel}>
											<View style={styles.itemlabelText}>
												<Text>{item.label}</Text>
												{
													// item.data &&
													<Text style={styles.remainMoney}>剩余200</Text>
												}
											</View>
											<Progress.Bar
												progress={this.getItemProgress()}
												color="orange"
												unfilledColor="#e0e0e0"
												borderWidth={0}
												width={progressInfo.itemWidth}
												style={styles.itemProgress}
											/>
											<View style={styles.itemInfo}>
												<Text style={styles.itemInfoText}>{this.getItemText(budgetSettings.budget_type)}</Text>
											</View>
										</View>
										<RightArrow style={styles.itemIcon} />
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
