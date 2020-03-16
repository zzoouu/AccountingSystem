import Util from '../../../utils/deviceInfo'
import { StyleSheet } from 'react-native'
const DWIDTH = Util.size.width
const DHEIGHT = Util.size.height
const IHEIGHT = 40
const STACKHEADER = 60
const MHEIGHT = DHEIGHT - (IHEIGHT + 10) * 2 - IHEIGHT - STACKHEADER - 20
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	item: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fffffb',
		height: IHEIGHT,
		paddingLeft: 10,
		width: DWIDTH
	},
	button: {
		width: 0.9 * DWIDTH,
		backgroundColor: '#fcaf17',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0,
		alignSelf: 'center',
		marginTop: MHEIGHT
	},
	cache: {
		flex: 15
	},
	rightArrow: {
		flex: 1
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: DWIDTH,
		height: DHEIGHT
	},
	modalContent: {
		width: 0.6 * DWIDTH,
		height: 0.15 * DHEIGHT,
		backgroundColor: '#FFFFFF',
	},
	modalMessage: {
		flex: 1,
		borderBottomColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalCheck: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalButton: {
		flex: 1
	}
})
export default styles
