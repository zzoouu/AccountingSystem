import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1
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
	}
})
export default styles
