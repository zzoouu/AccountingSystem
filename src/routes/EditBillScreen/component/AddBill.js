import React from 'react'
import { View, Text, TextInput, FlatList, TouchableHighlight, Button } from 'react-native'
import styles from '../css/AddBillCss'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { billColors } from '../../../utils/const'
import ButtonWrapper from '../../../components/Button/Button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react'

@inject(["billStore"])
@observer
class AddBill extends React.Component {
	constructor(props) {
		super(props)
		let { params = {} }  = props.route
		let billInfo = params.billInfo ? params.billInfo : {}
		this.state = {
			billName: billInfo.bill_name || undefined,
			isShared: !!(billInfo.isShared) || true,
			chosedColor: billInfo.color || billColors[0],
			placeholder: '请输入账本名称',
			warnText: undefined
		}
	}
	getShareIcon = () => {
		return !this.state.isShared ? "toggle-switch-off-outline" : "toggle-switch"
	}
	choseColor = (item) => {
		this.setState({
			chosedColor: item,
			feedBack: undefined
		})
	}
	createBill = async () => {
		const {
			billName,
			isShared,
			chosedColor: color
		} = this.state
		// console.log(billName, isShared, color)
		if (!billName) {
			this.state.warnText = '请输入账本名称'
		} else {
			const { params } = this.props.route
			if (params) {
				const { type, billInfo, refresh } = params
				const res = await this.props.billStore.updateBill({
					bill_id: billInfo.bill_id,
					bill_name: billName,
					isShared: isShared,
					color,
					members: billInfo.members
				})
				refresh()
				this.props.navigation.goBack()
			} else {
				const res = await this.props.billStore.createBill({ billName, isShared, color })
				if (res.msg === 'OK') {
					// this.props.navigation.navigate('Bills')
					this.props.navigation.navigate('BillContainer', {
						screen: 'Bills'
					})
				} else {
					this.setState({
						feedBack: res.msg
					})
					// console.log(this.state)
				}
			}
		}
	}
	render() {
		const { placeholder, warnText, billName, chosedColor } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.head}>
					<View style={styles.billName}>
						<Text style={styles.billNameText}>账本名称</Text>
						<TextInput
							style={styles.billNameInput}
							// onChangeText={(text) => console.log(text)}
							onChangeText={(text) => this.setState({ billName: text })}
							value={billName}
							placeholder={placeholder} />
					</View>
					<View style={styles.share}>
						<Text style={styles.shareText}>是否共享</Text>
						<MaterialCommunityIcons
							style={styles.shareIcon}
							onPress={() => this.setState({ isShared: !this.state.isShared })}
							name={this.getShareIcon()}
							size={35}
							color="green" />
					</View>
				</View>
				<View style={styles.colors}>
					<View style={styles.colorTitle}>
						<Text>请选择账本颜色</Text>
					</View>
					<FlatList
						data={billColors}
						horizontal={false}
						contentContainerStyle={styles.flatList}
						// numColumns={4}
						renderItem={({ item, index }) =>
							<TouchableHighlight
								keyExtractor={(item, index) => Math.random()}
								style={[styles.colorItem, { backgroundColor: item }]}
								underlayColor={item}
								onPress={() => this.choseColor(item)}>
								<MaterialIcons
									name="check"
									size={20}
									color="#fff"
									style={[styles.billCheckIcon, (item !== chosedColor) && { display: 'none' }]} />
							</TouchableHighlight>}
					/>
					{/* <ButtonWrapper
						handlePress={this.createBill}
						buttonStyle={styles.button}
						text="确定"
					/> */}
						</View>
					<TouchableHighlight
						underlayColor='#fcaf17'
						style={[styles.button]}>
						<Button
							title="确定"
							onPress={() => this.createBill()}
							color="black"
						/>
					</TouchableHighlight>
			</View>
		)
	}
}
export default AddBill
