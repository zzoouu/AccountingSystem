import React from 'react'
import { View, Text, TextInput, FlatList, TouchableHighlight, Button } from 'react-native'
import styles from '../css/AddBillCss'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { billColors } from '../../../utils/const'
import ButtonWrapper from '../../../components/Button/Button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getUserinfo } from '../../../utils/storage'
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
			warnFlag: false
		}
	}
	componentDidMount() {
		// console.log(this.props)
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
	handleBillName = text => {
		const { warnFlag } = this.state
		if (warnFlag) {
			this.setState({
				warnFlag: false,
				billName: ''
			})
		} else {
			this.setState({
				billName: text
			})
		}
	}
	createBill = async () => {
		const {
			billName,
			isShared,
			chosedColor: color
		} = this.state
		// console.log(billName, isShared, color)
		if (!billName) {
			this.setState({
				billName: '请输入账本名称',
				warnFlag: true
			})
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
				const userinfo = await getUserinfo()
				const members = [ userinfo.username ]
				const res = await this.props.billStore.createBill({ billName, isShared, color, members })
				if (res.code === 1) {
					this.props.navigation.navigate('BillContainer', {
						screen: 'Bills'
					})
				} else {
					this.setState({
						warnFlag: true,
						billName: res.msg
					})
				}
			}
		}
	}
	render() {
		const { placeholder, billName, chosedColor, warnFlag } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.head}>
					<View style={styles.billName}>
						<Text style={[styles.billNameText]}>账本名称</Text>
						<TextInput
							style={[styles.billNameInput, warnFlag && { color: 'red'}, { width: 250} ]}
							// onChangeText={(text) => console.log(text)}
							onChangeText={(text) => this.handleBillName(text)}
						clearButtonMode={true}
						onFocus={() => {this.setState({warnFlag: false, billName: ''})}}
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
