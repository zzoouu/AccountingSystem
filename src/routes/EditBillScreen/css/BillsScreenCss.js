import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
const { width, height } = Util.size

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	flatList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingLeft: 20,
		paddingRight: 20
	},
	billContainer: {
		flex: 1,
		alignItems: 'center'
	},
	billItem: {
		width: 100,
		height: 130,
		marginTop: 15,
		flex: 0,
		marginRight: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10
	}
})
export default styles
