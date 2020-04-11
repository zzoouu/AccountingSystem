import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
import { recommendList } from '../../../utils/const'
const ITEMHEIGHT = 40
const getTopHeight = () => {
	const deviceHeight = Util.size.height
	const topHeight = deviceHeight - ITEMHEIGHT * recommendList.length
	return topHeight
}
const styles = StyleSheet.create({
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
	}
})
export default styles

