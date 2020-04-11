import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../../routes/HomeScreen/HomeScreen'
import BudgetScreen from '../../routes/BudgetScreen/BudgetScreen'
import EditBillScrenn from '../../routes/EditBillScreen/EditBillScreen'
import ProfilesScreen from '../../routes/ProfileScreen/ProfileScreen'

class RootsBar extends React.Component {
	componentDidMount() {}
	render() {
		const Tab = createBottomTabNavigator()
		return (
			<>
				<Tab.Navigator
					initialRouteName="Profile"
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName
							switch (route.name) {
								case 'Home':
									iconName = 'md-home'
									break
								case 'Budget':
									iconName = 'md-calculator'
									break
								case 'EditBill':
									iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline'
									break
								default:
									iconName = 'ios-settings'
							}
							return <Ionicons name={iconName} size={size} color={color} />
						}
					})}
					tabBarOptions={{
						activeTintColor: 'tomato', // 当前选中的 tab bar 的文本颜色和图标颜色
						inactiveTintColor: 'gray', // 当前未选中的 tab bar 的文本颜色和图标颜色
						showIcon: true, // 是否显示 tab bar 的图标
						showLabel: true, // 是否显示 tab bar 的文本
						pressColor: '#788493', // 波纹颜色
						pressOpacity: 0.8, // 按下 tab bar 的不透明度
						labelStyle: {
							// color: 
						}
					}}>
					<Tab.Screen
						name="Home"
						component={HomeScreen}
						options={{
							tabBarLabel: '主页'
						}}
					/>
					<Tab.Screen
						name="Budget"
						component={BudgetScreen}
						options={{
							tabBarLabel: '预算',
						}}
					/>
					<Tab.Screen
						name="EditBill"
						component={EditBillScrenn}
						options={{
							tabBarLabel: '记账',
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={ProfilesScreen}
						options={{
							tabBarLabel: '我的',
						}}
					/>
				</Tab.Navigator>
			</>
		)}
}
export default RootsBar
