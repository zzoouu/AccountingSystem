import React from 'react'
import { View, Text } from 'react-native'
import styles from '../css/BillMembersCss'
class BillMembers extends React.Component {
	constructor(props) {
		super(props)
		const { billInfo } = this.props.route.params
		this.state = {
			billInfo,
			members: this.getMembers(billInfo)
		}
	}
	getMembers = billInfo => {
		const { members } = billInfo
		return members ? members.split(',') : []
	}
	render() {
		const { members} = this.state
		return (
			<View style={styles.container}>
				{
					members.map(item => {
						return (
							<View style={styles.member}><Text>{item}</Text></View>
						)
					}
					)
				}
			</View>
		)
	}
}
export default BillMembers
