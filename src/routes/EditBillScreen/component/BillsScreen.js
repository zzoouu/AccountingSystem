import React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import styles from '../css/BillsScreenCss'
import { observer, inject } from 'mobx-react'
import EmptyBills from './EmptyBills'
import Entypo from 'react-native-vector-icons/Entypo'
import billRouter from '../router'

@inject(['billStore'])
@observer
class BillScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		this.props.billStore.getBills()
	}
	handelAddBill = (prop) => {
		this.props.navigation.navigate('BillContainer',
			{ screen: 'AddBill' }
		)
	}
	render() {
		const { billStore, navigation, route } = this.props
		// const bills = []
		return (
			<View style={styles.container}>
				{
					billStore.bills.length ? <Bills navigation={navigation} params={route.params} /> : <EmptyBills handelAddBill={this.handelAddBill} />
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
	}
	componentDidMount() {

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
		return (
			<View style={styles.billContainer}>
				<FlatList
					data={billStore.bills}
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
										<Entypo name="slideshare" size={18} color="red" style={{ marginLeft: 5 }} />
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
