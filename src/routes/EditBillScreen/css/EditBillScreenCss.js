import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
const { width, height } = Util.size

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	tabItem: {
		height: 40,
		backgroundColor: '#ffffff',
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingLeft: 15,
		paddingRight: 15
	},
	tabArrow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	choseBill: {
		textAlign: 'right',
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginLeft: 5
	},
	font12: {
		fontSize: 14
	},
	iconTags: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	flatList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	iconItem: {
		flex: 0,
		width: 85,
		height: 85,
		marginBottom: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	iconBack: {
		backgroundColor: '#F2F2F2',
		width: 50,
		height: 50,
		borderRadius: 25,
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconText: {
		marginTop: 8,
		color: '#D4D4D4'
	},
	modal: {
		width: width * 0.9,
		height: height * 0.35,
		marginLeft: width * 0.05,
		marginTop: height * (1 - 0.35),
		backgroundColor: '#ffffff',
		flex: 0,
		borderTopColor: '#F2F2F2',
		borderTopWidth: 1
	},
	modalHead: {
		height: 40,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center'
	},
	headNote: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headValue: {
		flex: 1,
		textAlign: 'right',
	},
	modalBody: {
		flex: 1
	},
	gridRow: {
		flex: 1,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#f2f2f2',
		alignItems: 'center'
	},
	num: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#f2f2f2',
		borderTopWidth: 1,
		borderTopColor: '#f2f2f2',
		height: (height * 0.35 - 40) / 4
	},
	dateModal: {
		flex: 0,
		height: height * 0.25,
		marginTop: height * (1 - 0.25),
		backgroundColor: '#ffffff'
	},
	dateModalHead: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
		backgroundColor: '#AEEEEE',
		paddingLeft: 12,
		paddingRight: 12
	},
	dateModalTime: {
		borderRightWidth: 1,
		borderRightColor: '#C1FFC1'
	}
})
export default styles
