import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
import { recommendList } from '../../../utils/const'
const ITEMHEIGHT = 40
const getTopHeight = () => {
	const deviceHeight = Util.size.height
	const topHeight = deviceHeight - ITEMHEIGHT * recommendList.length
	return topHeight
}
const { width, height } = Util.size
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	head: {
		flex: 0,
		backgroundColor: '#fff',
		flexDirection: 'row',
		height: 110,
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20
	},
	loginIcon: {
		flex: 0,
		paddingLeft: 20,
		width: width * 0.2,
		height: 60,
		justifyContent: 'space-around',
		alignItems: 'center',
		marginRight: 10,
	},
	unlogin: {
		flex: 0,
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	loginInfo: {
		flex: 0,
		height: 60,
		width: width * 0.8,
		justifyContent: 'center',
		paddingRight: 30,
	},
	loginUser: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		height: 30,
		justifyContent: 'space-between',
	},
	loginText: {
	},
	loginName: {
		fontSize: 14
	},
	signin: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center'
	},
	signinText: {
		fontSize: 14,
		marginRight: 6
	},
	progressWrapper: {
		flex: 0,
		height: 8,
		width: width * 0.8
		// backgroundColor: 'red'
	},
	progress: {
		height: 8,
	},
	progressInfo: {
		height: 22,
		flex: 0,
		justifyContent: 'flex-end',
	},
	progressDays: {
		fontSize: 12,
		color: '#A6A6A6'
	},
	main: {
		flex: 3,
		backgroundColor: '#f0f0f0'
	},
	listItem: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fffffb',
		height: 40,
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 0.3
	},
	itemIcon: {
		width: 26
	},
	itemLabel: {
		flex: 4
	},
	modalContent: {
		flex: 1,
		marginTop: getTopHeight()
	},
	recommendItem: {
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: ITEMHEIGHT,
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 0.4
	}
})
export default styles
