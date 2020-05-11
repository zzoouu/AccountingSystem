import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'

const { width, height } = Util.size

const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: 5
	},
	listItem: {
		height: 45,
		flex: 0,
		flexDirection: 'row',
		borderBottomColor: '#f3f3f3',
		backgroundColor: '#fff',
		borderBottomWidth: 0.8,
		alignItems: 'center',
		paddingLeft: 18
	},
	left8: {
		marginLeft: 8,
	},
	iconItem: {
		flex: 0,
		flexDirection: 'row',
		marginLeft: 12
	},
	iconText: {
		color: 'green',
	},
	icon: {
		width: 30,
		height: 30,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginLeft: 12
	},
	captcha: {
		width: width * 0.6,
		borderRightColor: '#f3f3f3',
		borderRightWidth: 2
	},
	captchaText: {
		marginLeft: 10,
		color: '#8E8E8E'
	},
	button: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 18,
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fcaf17',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5
	}
})
export default styles
