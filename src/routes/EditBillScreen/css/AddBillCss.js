import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	head: {
		backgroundColor: '#EDEDED',
		height:100
	},
	billName: {
		flex: 0,
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		backgroundColor: '#ffffff',
		paddingLeft: 20,
		paddingRight: 20
	},
	billNameText: {
		marginRight: 8,
	},
	billNameInput: {
		flex: 1,
		borderBottomColor: '#000000',
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginTop: 5
	},
	share: {
		flex: 0,
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		// marginBottom: 20,
		backgroundColor: '#ffffff',
		paddingLeft: 20,
		paddingRight: 20
	},
	shareIcon: {
		flex: 1,
		textAlign: 'right',
	},
	colors: {
		paddingLeft: 20,
		paddingRight: 20,
		flex: 0,
		backgroundColor: '#fff'
	},
	colorTitle: {
		height: 40,
		flex: 0,
		alignItems: 'center',
		marginTop: 10
	},
	colorItem: {
		width: 100,
		height: 100,
		marginRight: 10,
		marginBottom: 15
	},
	flatList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	billCheckIcon: {
		marginLeft: 8,
		marginTop: 5
	},
	button: {
		marginTop: 20,
		height: 40,
		backgroundColor: '#fcaf17',
		marginLeft: 20,
		marginRight: 20,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		flex: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
export default styles
