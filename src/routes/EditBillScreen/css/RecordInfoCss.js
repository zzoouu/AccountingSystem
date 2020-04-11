import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
		flex: 1,
	},
	recordItem: {
		flex: 0,
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		backgroundColor: '#fff',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1
	},
	button: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
		backgroundColor: '#fcaf17',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		height: 40,
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
export default styles
