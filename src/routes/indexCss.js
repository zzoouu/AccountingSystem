import { StyleSheet } from 'react-native'
import Util from '../utils/deviceInfo'
import { recommendList } from '../utils/const'
const ITEMHEIGHT = 40
const getTopHeight = () => {
	const deviceHeight = Util.size.height
	const topHeight = deviceHeight - ITEMHEIGHT * recommendList.length
	return topHeight
}
const indexStyle = StyleSheet.create({
	container: {
		flex: 1
	},
	head: {
		flex: 1
	},
	img: {
		flex: 1
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
	scanWrap: {
		flex: 1,
		flexDirection: 'row'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	rectangleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	rectangle: {
		height: 200,
		width: 200,
		borderWidth: 1,
		borderColor: '#00FF00',
		backgroundColor: 'transparent',
	},
	rectangleText: {
		flex: 0,
		color: '#fff',
		marginTop: 10
	},
	border: {
		flex: 0,
		width: 200,
		height: 2,
		backgroundColor: '#00FF00'
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
export default indexStyle
