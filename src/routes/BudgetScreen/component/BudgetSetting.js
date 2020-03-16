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
			budget: props.budgetStore.budgetInfo.budget.totalBudget.toString()
		}
	}
	getTypeText =type => {
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
	editType = () => {
		this.props.navigation.navigate('BudgetType')
	}
	render() {
		const { budget } = this.state
		const { budgetStore } = this.props
		const { budgetInfo } = budgetStore
		return (
			<View style={styles.container}>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>开启预算</Text>
					<FontAwesome5
						onPress={() => budgetStore.setIsBudgetAllow(!budgetInfo.isBudgetAllowed)}
						name={this.getIconInfo(budgetInfo.isBudgetAllowed).name}
						size={35}
						color={this.getIconInfo(budgetInfo.isBudgetAllowed).color} />
				</View>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>预算类型</Text>
					<TouchableHighlight underlayColor="##ffffff" onPress={() => this.editType()}>
						<View style={styles.itemRight}>
							<Text>{this.getTypeText(budgetInfo.budgetType)}</Text>
							<RightArrow style={{ marginLeft: 8 }} />
						</View>
					</TouchableHighlight>
				</View>
				<View style={[styles.item]}>
					<Text style={[styles.itemText]}>预算</Text>
					<TextInput 
						value={budget}
						onChangeText={e => this.setState({budget: e})} 
						onBlur={() => budgetStore.setTotalBudget(Number(this.state.budget))}
						style={[styles.itemRight]} 
					/>
				</View>
			</View>
		)
	}
}