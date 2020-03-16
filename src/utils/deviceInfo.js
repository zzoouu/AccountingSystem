import React from 'react'
// 像素密度
import { PixelRatio, Dimensions } from 'react-native'
// 设备宽高

const Util = {
	radio: PixelRatio.get(),
	pixel: 1 / PixelRatio.get(),
	size: {
		// 设备方向改变，宽高改变
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	clg() {
		console.log(Dimensions.get('window').width, Dimensions.get('window').height)
	}
}

export default Util
