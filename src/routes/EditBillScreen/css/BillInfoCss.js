import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'

const { width, height } = Util.size

const styles = StyleSheet.create({
  container: {
		flex: 1
	},
	head: {
		height: 60,
		flex: 0,
		paddingTop: 8,
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 8,
		backgroundColor: '#292929'
	},
	billInfo: {
		height: 25,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	billName: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center'
	},
	billNameText: {
		fontSize: 16,
		color: '#fff'
	},
	billColor: {
		width: 15,
		height: 15,
		marginLeft: 10,
	},
	billMoney: {
		flex: 0,
		flexDirection: 'row'
	},
	billMoneyText: {
		marginRight: 10,
		color: '#fff'
	},
	records: {
		flex: 1
	},
	itemBar: {
		height: 25,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 5,
		paddingLeft: 5
	},
	itemBarInfo: {
		flex: 0,
		flexDirection: 'row'
	},
	itemBarMoney: {
		marginRight: 6,
		fontSize: 12
	},
	list: {
		backgroundColor: '#ffffff',
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 0.3,
		flex: 0,
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		paddingLeft: 8,
		paddingRight: 8
	},
	listIcon: {
		marginRight: 8
	},
	authorWrapper: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 20
	},
	authorText: {
		marginLeft: 5
	},
	money: {
		flex: 1,
		textAlign: 'right'
	},
	dateTimePicker: {
		backgroundColor: 'white'
	},
	dateButton: {
		paddingLeft: 12,
		paddingRight: 12,
		marginTop: height * 0.75,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
		backgroundColor: '#fcaf17'
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	emptyText: {
		fontSize: 16,
		color: '#696969'
	},
	modalContent: {
		flex: 1,
		marginTop: height - 40 * 5,
	},
	editRecordItem: {
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: 40,
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 0.4,
	}
})
export default styles
