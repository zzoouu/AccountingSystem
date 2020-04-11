import React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import { budgetTypeObj } from '../../../utils/const'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../css/BudgetTypeCss'
import { inject, observer } from 'mobx-react'

@inject(["budgetStore"])
@observer
class BudgetType extends React.Component {
	constructor(props) {
		super(props)
	}
	setType = type => {
		const setTypeState = this.props.route.params.setTypeState
		setTypeState(type)
		this.props.navigation.navigate('BudgetSetting')
	}
	render() {
		return (
			<FlatList
				data={budgetTypeObj}
				renderItem={({ item }) => {
					return (
						<TouchableHighlight
							keyExtractor={(item) => Math.random()}
							onPress={() => this.setType(item.key)}>
							<View style={styles.container}>
								<Text style={styles.text}>{item.label}</Text>
								{
									item.key === this.props.route.params.budget_type &&
									<Ionicons style={styles.icon} name="md-checkmark" size={24} color="#0080FF" />
								}
							</View>
						</TouchableHighlight>
					)
				}}
			/>
		)
	}
}
export default BudgetType
