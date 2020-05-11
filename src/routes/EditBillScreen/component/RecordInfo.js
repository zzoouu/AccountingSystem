import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../css/RecordInfoCss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonWrapper from '../../../components/Button/Button'
import { observer, inject } from 'mobx-react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import homeStore from '../../../../store/HomeStore'
import MyIconFont from '../../../components/icon/iconfont'

@inject('billStore', 'homeStore')
@observer
class RecordInfo extends React.Component {
    constructor(props) {
		super(props)
		const { recordInfo } = props.route.params
		this.state = {
			recordInfo
		}
	}
	deleteRecordById = async record_id => {
		console.log(this.props.route)
		const { bill_id, refresh } = this.props.route.params
		await this.props.billStore.deleteRecordById(bill_id, record_id)
		homeStore.getRecords()
		refresh && refresh()
		this.props.navigation.goBack()
	}
	render() {
		console.log(this.props.route)
		const { recordInfo } = this.state
		return (
			<View style={styles.container}>
				<View style={[styles.recordItem, {paddingTop: 12}]}>
					<Text>图标: </Text>
					<MyIconFont name={recordInfo.icon} size={24} color="green" />
				</View>
				<View style={styles.recordItem}>
					<Text>类型: {recordInfo.record_name}</Text>
				</View>
				<View style={styles.recordItem}>
					<Text>金额: {recordInfo.money}</Text>
				</View>
				<View style={styles.recordItem}>
					<Text>描述: {recordInfo.desc || '暂无描述'}</Text>
				</View>
				<View style={styles.recordItem}>
					<Text>可分享: {recordInfo.record_type == 1 ? '是' : '否'}</Text>
				</View>
				<View style={styles.recordItem}>
					<Text>记录人员: {recordInfo.author}</Text>
				</View>
				<View style={styles.recordItem}>
					<Text>记录时间: {recordInfo.record_date}</Text>
				</View>
					<TouchableHighlight
					style={styles.button}
					underlayColor="#fcaf17"
					onPress={() => this.deleteRecordById(recordInfo.record_id)}>
					<Button
						title="删除"
						color="black"
					/>
					</TouchableHighlight>
				{/* <ButtonWrapper buttonStyle={styles.button} text="删除" handlePress={() => this.deleteRecordById(recordInfo.record_id)} /> */}
			</View>
		)
	}
}
export default RecordInfo
