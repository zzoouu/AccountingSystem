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
import { Provider } from 'mobx-react'
import store from './store/index'

import StackContainer from './src/StackContainer.js'
// 取消黄色警告
console.disableYellowBox = true

// const App:  () => React$Node = () => {
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

