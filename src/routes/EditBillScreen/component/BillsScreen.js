import React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from '../css/BillsScreenCss'
import { observer, inject } from 'mobx-react'
import EmptyBills from './EmptyBills'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUserinfo } from '../../../utils/storage'
import { toJS } from 'mobx'
import billStore from '../../../../store/BillStore'

@inject(['billStore'])
@observer
class BillScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userinfo: undefined,
			text: undefined
		}
	}
	async componentDidMount() {
		await this.handleUserinfo()
		if (this.state.userinfo) {
			await this.props.billStore.getBills()
			!billStore.bills.length && this.setState({text: '对不起，您还没有账本，请点击添加您的账本~'})
		} else {
			this.setState({ text: '亲，还未登录，请先登录~~'})
		}
	}
	handleUserinfo = async () => {
		const userinfo = await getUserinfo()
		this.setState({
			userinfo
		})
	}
	handelAddBill = (prop) => {
		const { userinfo } = this.state
		if (userinfo){
			this.props.navigation.navigate('AddBill')
		} else {
			this.props.navigation.navigate('ProfileContainer', {
				screen: 'Login'
			})
		}
	}
	render() {
		const { billStore, navigation, route } = this.props
		const { userinfo, text } = this.state
		const params = Object.assign({}, route.params, {
			userinfo
		})
		// const bills = []
		return (
			<View style={styles.container}>
				{
					billStore.bills.length ? <Bills navigation={navigation} params={params} /> : <EmptyBills handelAddBill={this.handelAddBill} text={text} />
				}
			</View>
		)
	}
}

@inject(['billStore'])
@observer
class Bills extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	async componentDidMount() {
		const { params } = this.props
		if (params.shareInfo) {
			this.addBillByShare()
		}
		// await this.handleUserinfo()
		// this.props.billStore.getBills({username: this.state.userinfo.username})
	}
	addBillByShare = async () => {
		const {
			params: {
				shareInfo,
				// userinfo
			},
			billStore
		} = this.props
		if (shareInfo) {
			console.log(this.props.params)
			let { members } = shareInfo
			const userinfo = await getUserinfo()
			console.log(members, userinfo)
			let arr = members.split(',')
			arr.push(userinfo.username)
			members.split(',').push(userinfo.username)
			// 分享之前先处理账本是否可分享
			await billStore.updateBill({
				bill_id: shareInfo.bill_id,
				members: arr.join(','),
				author: userinfo.username
			})
		}
	}
	choseBill = item => {
		const {
			params: {
				choseType,
				getBillParams
			},
			navigation
		} = this.props
		if (choseType === 'select') {
			getBillParams({ bill_id: item.bill_id, bill_name: item.bill_name })
			navigation.goBack()
		} else if (choseType === 'show') {
			navigation.navigate('BillContainer', {
				screen: 'BillInfo',
				params: {
					bill_id: item.bill_id
				}
			})
		}
	}
	render() {
		const { billStore } = this.props
		const bills = toJS(billStore.bills)
		return (
			<View style={styles.billContainer}>
				<FlatList
					data={bills}
					// contentContainerStyle={styles.flatList}
					numColumns={3}
					renderItem={({ item, index }) => {
						return (
							<TouchableHighlight
								keyExtractor={(item, index) => Math.random()}
								underlayColor="#fff"
								onPress={() => { this.choseBill(item) }}>
								<View style={[styles.billItem, { backgroundColor: item.color }, ((index + 1) % 3 === 0) && { marginRight: 0 }]}>
									<Text>{item.bill_name}</Text>
									{
										(Number(item.isShared) === 1) &&
										<MaterialCommunityIcons name="bookmark-multiple" size={18} color="red" style={{ marginLeft: 5 }} />
									}
								</View>
							</TouchableHighlight>
						)
					}}
				/>
			</View>
		)
	}
}

export default BillScreen
