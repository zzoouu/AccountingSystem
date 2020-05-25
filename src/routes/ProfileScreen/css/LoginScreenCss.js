import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1
		},
		listItem: {
			backgroundColor: '#fff',
			height: 45,
			flex: 0,
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 15,
			paddingTop: 8,
			borderBottomColor: '#f3f3f3',
			borderBottomWidth: 0.8,
		},
		txtInput: {
			marginLeft: 8,
			width: 280
		},
		button: {
			marginLeft: 15,
			marginRight: 15,
			marginTop: 20,
			flex: 0,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#fcaf17',
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5,
			borderBottomRightRadius: 5,
			borderBottomLeftRadius: 5
		},
		warn: {
			flex: 0,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 20
		}
})
export default styles
