import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
		flex: 1
	},
	item: {
		height: 50,
		fontSize: 16,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#d3d7d4',
		borderBottomWidth: 0.3,
		paddingLeft: 14,
		paddingRight: 14,
		backgroundColor: '#ffffff'
	},
	itemText: {
		flex: 1
	},
	itemRight: {
		flex: 1,
		textAlign: 'right',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	}
})
export default styles
