import React from 'react'
import { View, Text, Image, FlatList, TouchableHighlight, Modal, Share } from 'react-native'
import indexStyle from '../indexCss'
import Util from '../../utils/deviceInfo'
import { profileList, recommendList } from '../../utils/const'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RightArrow from '../../components/RightArrow'

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deviceWith: Util.size.width,
			deviceHeight: Util.size.height,
			iconSize: 20,
			showModal: false,
			shareResult: ''
		}
	}
	handlePress = (e, key) => {
		if (key === 'Recommend') {
			this.setState({
				showModal: true
			})
		} else {
			this.props.navigation.navigate(key)
		}
	}
	handleScan = () => {
		this.props.navigation.navigate('Home')
	}
	handleRecommend = async (e, label) => {
		if (label === '取消') {
			this.setState({
				showModal: 'false'
			})
		} else {
			try {
				const result = await Share.share({
					message: '这是 share 组件',
					url: 'https://weixin.qq.com/'
				})
				if (result.action === Share.sharedAction) {
					if (result.activityType){
						this.setState({
							shareResult: 'shared with activitytype' + result.activityType
						})
					} else {
						this.setState({
							shareResult: 'result: shared'
						})
					}
				} else if (result.action === Share.dismissedAction){
					this.setState({
						shareResult: 'failed share'
					})
				} 
			} catch(e) {
				console.log('e', e)
			}
			console.log(this.state.shareResult)
		}
	}
	render() {
		const { iconSize } = this.state
		return (
			<>
				<View style={indexStyle.container}>
					<View style={indexStyle.head}>
						<Image
							source={require('./img/icon-76.png')}
							style={[indexStyle.img, { width: Util.size.width }]}
						/>
					</View>
					<View style={indexStyle.main}>
						<FlatList
							data={profileList}
							renderItem={({ item }) => {
								return (
									<TouchableHighlight
										key={item.key}
										onPress={e => this.handlePress(e, item.key)}>
										<View style={indexStyle.listItem}>
											<Ionicons
												name={item.icon}
												size={iconSize}
												color={item.color}
												style={indexStyle.itemIcon}
											/>
											<Text style={indexStyle.itemLabel}>{item.label}</Text>
											<RightArrow />
										</View>
									</TouchableHighlight>
								)
							}}
						/>
					</View>
					<Modal
						style={indexStyle.modal}
						animationType="slide"
						transparent={true}
						visible={this.state.showModal}>
						<View style={indexStyle.modalContent}>
							<FlatList
								data={recommendList}
								renderItem={({ item }) => {
									return (
										<TouchableHighlight
											key={item.key}
											onPress={e => this.handleRecommend(e, item.label)}>
											<View style={indexStyle.recommendItem}>
												<Text>{item.label}</Text>
											</View>
										</TouchableHighlight>
									)
								}}
							/>
						</View>
					</Modal>
				</View>
			</>
		)
	}
}
export default ProfileScreen

/**
 * .prettierrc.js
 * module.exports = {
  bracketSpacing: true, // 对象大括号之间是否有空格
  jsxBracketSameLine: true, // jsx的>在同一行
  singleQuote: true, // 单引号
  trailingComma: 'none', // 是否使用尾逗号, none | es5 | all
  tabWith: 2,
  useTabs: true,
	semi: false, // 分号,
  arrowFunctionParentheses: 'avoid',
  endOfLine: 'auto'
};

 */
