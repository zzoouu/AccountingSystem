import React from 'react'
import { View, Text, TouchableHighlight, TextInput } from 'react-native'
import styles from '../css/BudgetSettingCss'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import RightArrow from '../../../components/RightArrow'
import { budgetTypeObj } from '../../../utils/const'
import { observer, inject } from 'mobx-react'

@inject(["budgetStore"]) // 注入对应的 store
@observer // 监听当前组件

export default class BudgetSetting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			budget_type: 1, // 0 year  1 month   2 day
			isBudget: 1,  // 0 不开启预算   1 开启预算
			total_budget: '0'
		}
	}
	componentDidMount() {
		this.initBudgetSettings()
	}
	initBudgetSettings = async () => {
		await this.props.budgetStore.getBudgetSetting()
		const { budgetSettings = {} } = this.props.budgetStore
		// console.log('in', budgetSettings)
		const {
			budget_type,
			isBudget,
			total_budget
		} = budgetSettings
		this.setState({
			budget_type,
			isBudget,
			total_budget: String(total_budget)
		})
	}
	getTypeText = type => {
		return budgetTypeObj.find(item => item.key === type).label
	}
	getIconInfo = (flag = true) => {
		let ret
		if (flag) {
			ret = {
				name: 'toggle-on',
				color: '#585eaa'
			}
		} else {
			ret = {
				name: 'toggle-off',
				color: '#d3d7d4'
			}
		}
		return ret
	}
	setTypeState = type => {
		this.setState({
			budget_type: type
		})
	}
	editType = () => {
		this.props.navigation.navigate('BudgetType', {
			budget_type: this.state.budget_type,
			setTypeState: this.setTypeState.bind(this)
		})
	}
	setTotalBudget = e => {
		this.setState({
			total_budget: e
		})
	}
	setIsBudgetAllow = () => {
		this.setState({
			isBudget: !this.state.isBudget
		})
	}
	setBudget = () => {
		const { budget_type, isBudget, total_budget } = this.state
		const { budgetSettings } = this.props.budgetStore
		// const flag = !Object.keys(this.state).map(item => budgetSettings[item] === this.state[item]).every(item => item)
		const flag = budget_type === budgetSettings.budget_type && isBudget === budgetSettings.isBudget && Number(total_budget) === budgetSettings.total_budget
		!flag && this.props.budgetStore.setBudget({
			budget_type,
			isBudget,
			total_budget: Number(total_budget)
		})
		this.props.navigation.navigate('Budget')
		this.props.budgetStore.setHandleConfirm(false)
	}
	render() {
		const { total_budget, isBudget, budget_type } = this.state
		const { budgetStore : {handleConfirm} } = this.props
		handleConfirm && this.setBudget()
		return (
			<View style={styles.container}>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>开启预算</Text>
					<FontAwesome5
						onPress={() => this.setIsBudgetAllow()}
						name={this.getIconInfo(isBudget).name}
						size={35}
						color={this.getIconInfo(isBudget).color} />
				</View>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>预算类型</Text>
					<TouchableHighlight underlayColor="##ffffff" onPress={() => this.editType()}>
						<View style={styles.itemRight}>
							<Text>{this.getTypeText(budget_type)}</Text>
							<RightArrow style={{ marginLeft: 8 }} />
						</View>
					</TouchableHighlight>
				</View>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>预算</Text>
					<TextInput
						value={total_budget}
						onChangeText={e => this.setTotalBudget(e)}
						style={[styles.itemRight]}
					/>
				</View>
			</View>
		)
	}
}

export const headConfirm = ({navigation}) => {
	return (
		<Text>确定</Text>
	)
}