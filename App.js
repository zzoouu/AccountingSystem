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
import { SafeAreaView, ScrollView, View, Text, StatusBar, Button } from 'react-native';
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
import { Provider } from 'mobx-react'
import store from './store/index'
const Stack = createStackNavigator()

// const App:  () => React$Node = () => {

const App = () => {
	return (
		<Provider {...store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="StackHome"
					screenOptions={{
						headerStyle: {
							backgroundColor: '#fcaf17',
							height: 60
						},
						headerBackTitleVisible: false,
						headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={30} />,
						headerLeftContainerStyle: {
							paddingLeft: 8,
							width: 50
						}
					}}>
					<Stack.Screen
						name="StackHome"
						component={RootsBar}
						options={{
							headerStyle: {
								// height: 
							},
							headerShown: false
						}}
					/>
					<Stack.Screen
						name="Scan"
						component={ScanScreen}
						options={{
							title: '扫一扫',
							// headerBackTitle: '返回',
							headerRight: () => <Text>相册</Text>,
							headerRightContainerStyle: {
								color: 'red',
								marginRight: 8,
								fontSize: 16
							}
						}}
					/>
					<Stack.Screen
						name="BudgetSetting"
						component={BudgetSetting}
						options={{
							title: '预算设置'
						}}
					/>
					<Stack.Screen
						name="BudgetType"
						component={BudgetType}
						options={{
							title: '预算类型'
						}}
					/>
					<Stack.Screen
						name="Recommend"
						component={RecommendScreen}
						options={{
							title: '推荐给朋友'
						}}
					/>
					<Stack.Screen
						name="Setting"
						component={SettingScreen}
						options={{
							title: '设置'
						}}
					/>
					<Stack.Screen
						name="Suggest"
						component={SuggestScreen}
						options={{
							title: '意见反馈'
						}}
					/>
					<Stack.Screen
						name="Warn"
						component={WarnScreen}
						options={{
							title: '提醒设置'
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
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
