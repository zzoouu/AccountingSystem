import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RegistScreen from './RegistScreen'
import LoginScreen from './LoginScreen'

const Tab = createMaterialTopTabNavigator()

function LoginRegist() {
	return (
		<Tab.Navigator
			initialRouteName="Regist"
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
				name="Regist"
				component={RegistScreen}
				options={{
					tabBarLabel: '注册'
				}}
				listeners={{
					tabPress: e => {
						console.log(1)
					}
				}}
			/>
			<Tab.Screen
				name="Login"
				component={LoginScreen}
				options={{
					tabBarLabel: '登录'
				}}
				listeners={{
					tabPress: e => {
						console.log(2)
					}
				}}
			/>
		</Tab.Navigator>
	)
}
export default LoginRegist
