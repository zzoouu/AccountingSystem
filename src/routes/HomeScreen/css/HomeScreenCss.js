import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
const { width, height } = Util.size
const styles = StyleSheet.create({
	container: {
		flex: 1
		// backgroundColor: 'red'
	},
	header: {
		backgroundColor: '#BBFFFF',
		flex: 0,
		height: Util.size.height * 0.22,
	},
	iconNavigate: {
		flex: 0,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	},
	title: {
		textAlign: 'center',
		flex: 1
	},
	headerItem: {
		paddingLeft: 18,
		paddingRight: 18
	},
	flexRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemLabel: {
		fontSize: 18,
		marginRight: 8
	},
	itemMoney: {
		marginRight: 25
	},
	iconItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fontIcon: {
		marginRight: 6,
		fontSize: 14
	},
	dateTimePicker: {
		width,
		height: height * 0.2,
		marginTop: height * 0.8 - 80,
	},
	font24: {
		fontSize: 16
	},
	body: {
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
	money: {
		flex: 1,
		textAlign: 'right'
	},
	unlogin: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
export default styles
