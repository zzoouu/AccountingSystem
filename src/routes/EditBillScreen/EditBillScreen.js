import React from 'react'
import { View, Text, Modal, TouchableHighlight, FlatList } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './css/EditBillScreenCss'
const Tab = createMaterialTopTabNavigator()
class IncomeScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.tabItem}>
					<TouchableHighlight style={styles.tabArrow}>
						<View style={styles.tabArrow}>
							<Text style={[styles.font12]}>今天</Text>
							<Ionicons style={styles.icon} name="ios-arrow-down" size={20} color="#000000" />
						</View>
					</TouchableHighlight>
					<TouchableHighlight style={styles.choseBill}>
						<View style={styles.choseBill}>
							<Text style={[styles.font12]}>选择账本</Text>
							<Ionicons name="ios-paper" size={18} color="#000000" style={styles.icon} />
						</View>
					</TouchableHighlight>
				</View>
				<FlatList />
			</View>
		)
	}
}

class EditBillScreen extends React.Component {
	render() {
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
				/>
				<Tab.Screen
					name="pay"
					component={IncomeScreen}
					options={{
						tabBarLabel: '支出'
					}}
				/>
			</Tab.Navigator>
		)
	}
}
export default EditBillScreen;