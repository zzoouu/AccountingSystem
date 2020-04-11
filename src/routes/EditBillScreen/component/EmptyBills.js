import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from '../css/EmptyBillsCss'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// FontAwesome5
class EmptyBills extends React.Component {
	constructor(props) {
		super(props)
	}
  render() {
		const { handelAddBill } = this.props
		return (
			<View style={styles.container}>
				<TouchableHighlight underlayColor="#ffffff" onPress={() => handelAddBill(111)}>
					<FontAwesome5 name="exclamation-triangle" size={100} color="#f2f2f2" style={{marginBottom: 20}} />
				</TouchableHighlight>
				<Text>对不起，您还没有账本，请点击添加您的账本~</Text>
			</View>
		)
	}
}
export default EmptyBills
