import React from 'react'
import { Button, TouchableHighlight } from 'react-native'
import styles from './ButtonCss'
class ButtonWrapper extends React.Component {
	render() {
		const {
			handlePress,
			buttonStyle = {},
			text
		} = this.props
		return (
			<TouchableHighlight
				underlayColor='#fcaf17'
				onPress={() => handlePress()}
				style={[buttonStyle, styles.container]}>
				<Button
					title={text}
					color="black"
				/>
			</TouchableHighlight>
		)
	}
}
export default ButtonWrapper
