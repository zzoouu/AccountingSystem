import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RightArrow = ({color = '#d3d7d4', name = 'ios-arrow-forward', size = 20, style}) => {
	console.log('color', color, typeof color)
	return (<Ionicons
		color={color}
		name={name}
		size={size}
		style={style}
	/>)
}
export default RightArrow
