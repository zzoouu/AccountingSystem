import React from 'react'
import { Text, View, TouchableHighlight, Modal } from 'react-native'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import styles from './css/WarnScreenCss'
import MyIconFont from '../../components/icon/iconfont'
import styels from '../BudgetScreen/css/BudgetTypeCss'

@inject('billStore', 'homeStore', 'budgetStore')
@observer
class WarnScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			flag: 'Income',
			modalVisible: false,
			choseIcon: undefined,
			showJian: false,
			outIcon: undefined
		}
	}
	componentDidMount() {
		this.props.billStore.getDefaultIcons()
	}
	choseFlag = text => {
		this.setState({
			flag: text
		})
	}
	handleChoseIcon = item => {
		this.setState({
			choseIcon: item.icon
		})
	}
	hanldeButton = async bool => {
		const { choseIcon, flag } = this.state
		const { incomeIcons, payIcons } = this.props.billStore
		let arr = flag === 'Income' ? toJS(incomeIcons) : toJS(payIcons)
		arr = arr.concat()
		if (bool && choseIcon) {
			// 处理添加
			arr.map(item => {
				if (item.icon === choseIcon) {
					item.flag = 1
				}
			})
			await this.props.billStore.setTotalIcons(flag, arr)
		}
		this.setState({
			modalVisible: false,
			choseIcon: undefined
		})
	}
	handleOutIcon = async item => {
		const { outIcon, flag } = this.state
		const { incomeIcons, payIcons } = this.props.billStore
		let arr = flag === 'Income' ? toJS(incomeIcons) : toJS(payIcons)
		arr = arr.concat()
		if (item.icon === 'add') {
			this.setState({modalVisible: true, outIcon: undefined})
		} else if (item.icon === 'jian') {
			// chulijian
			arr.map(item => {
				if (item.icon === outIcon) {
					item.flag = 0
				}
			})
			await this.props.billStore.setTotalIcons(flag, arr)
			this.setState({showJian: false, outIcon: undefined})
		} else {
			this.setState({showJian: true, outIcon: item.icon})
		}
	}
	render() {
		const { flag, modalVisible, choseIcon, showJian, outIcon } = this.state
		const { payiconArr, iniconArr, incomeIcons, payIcons } = this.props.billStore
		let partIcons = flag === 'Income' ? iniconArr : payiconArr
		partIcons = partIcons.concat({ label: '添加', icon: 'add', flag: 0 })
		partIcons = showJian ? partIcons.concat({label: '减', icon: 'jian', flag: 0}) : partIcons
		let modalIcons = flag === 'Income' ? toJS(incomeIcons) : toJS(payIcons)
		return (
			<View>
				<View style={[styles.choseTab, styles.borderRadius]}>
					<TouchableHighlight
						style={[styles.tabItem, flag === 'Income' && styles.choseTabItem]}
						onPress={() => this.choseFlag('Income')}
						underlayColor="#fff"
					>
						<Text>收入</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[styles.tabItem, flag === 'Pay' && styles.choseTabItem]}
						onPress={() => this.choseFlag('Pay')}
						underlayColor="#fff"
					>
						<Text>支出</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.content}>
					{
						partIcons.map(item => {
							return (
								<View key={Math.random()} style={styles.partIcons}>
									<TouchableHighlight
									underlayColor="#EEE9E9"
									style={[styles.iconWrapper, outIcon === item.icon && { backgroundColor: '#EEDFCC' }]}
									onPress={() => this.handleOutIcon(item)}>
										<MyIconFont name={item.icon} size={25} color={outIcon === item.icon ? '#EE4000' : '#EE9572'} />
									</TouchableHighlight>
									<Text style={styles.iconText}>{item.label}</Text>
								</View>
							)
						})
					}
				</View>
				<Modal
					animated="slide"
					transparent={true}
					// style={[styles.modal]}
					visible={modalVisible}>
					<View style={[styles.modal]}>
						<View style={styles.head}>
							<Text onPress={() => this.hanldeButton(false)}>取消</Text>
							<Text onPress={() => this.hanldeButton(true)} style={choseIcon ? styles.confirmText : styles.headText}>确定</Text>
						</View>
						<View style={[styles.content]}>
							{
								modalIcons.map(item => {
									return (
										<View key={Math.random()} style={[styles.partIcons]}>
											<TouchableHighlight underlayColor="orange" style={[styles.iconWrapper, choseIcon === item.icon && { backgroundColor: '#EEDFCC' }]} onPress={() => this.handleChoseIcon(item)}>
												<MyIconFont name={item.icon} size={25} color={choseIcon === item.icon ? '#EE4000' : '#EE9572'} />
											</TouchableHighlight>
											<Text style={styles.iconText}>{item.label}</Text>
										</View>
									)
								})
							}
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}
export default WarnScreen
