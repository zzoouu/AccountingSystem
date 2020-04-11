/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, View, Text, StatusBar, Button, TouchableOpacityComponent } from 'react-native';
import myStyle from './src/index.css';
import RootsBar from './src/components/Tab/TabNavigate';
import { createStackNavigator } from '@react-navigation/stack'
import ScanScreen from './src/routes/ProfileScreen/ScanScreen'
import RecommendScreen from './src/routes/ProfileScreen/RecommendScreen'
import SettingScreen from './src/routes/ProfileScreen/SettingScreen'
import SuggestScreen from './src/routes/ProfileScreen/SuggestScreen'
import WarnScreen from './src/routes/ProfileScreen/WarnScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import BudgetSetting from './src/routes/BudgetScreen/component/BudgetSetting'
import BudgetType from './src/routes/BudgetScreen/component/BudgetType'
import BillsScreen from './src/routes/EditBillScreen/component/BillsScreen'
import AddBill from './src/routes/EditBillScreen/component/AddBill'
import BillInfo from './src/routes/EditBillScreen/component/BillInfo'
import { Provider } from 'mobx-react'
import store from './store/index'
import { TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { inject, observer } from 'mobx-react'
import budgetStore from './store/BudgetStore';
const Stack = createStackNavigator()

import StackContainer from './src/StackContainer.js'

// const App:  () => React$Node = () => {
// @inject(["budgetStore"])
// @observer
const App = () => {
		return (
			<Provider {...store}>
				<NavigationContainer>
					<StackContainer />
				</NavigationContainer>
			</Provider >
		)
}
export default App


{/* <StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={myStyle.scrollView}>
					<View style={myStyle.body}>
						<View style={myStyle.sectionContainer}>
							<Text style={myStyle.sectionTitle}>邹保玲</Text>
						</View>
					</View>
					<App1 />
				</ScrollView>
			</SafeAreaView> */}
