import React from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import { RNCamera } from 'react-native-camera'
import idnexStyle from '../indexCss'
import indexStyle from '../indexCss'

class ScanScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			moveAnim: new Animated.Value(0)
		}
	}
	componentDidMount() {
		this.startAnimation()
	}
	startAnimation = () => {
		this.state.moveAnim.setValue(0)
		Animated.timing(this.state.moveAnim,
			{
				toValue: -200,
				duration: 2000,
				easing: Easing.linear
			}
		).start(() => this.startAnimation())
	}
	//  识别二维码,处理扫描结果
	onBarCodeRead = (result) => {
		const { navigate } = this.props.navigation
		const { data } = result
		navigate('Home', {
			url: data
		})
		// console.log('san', data, result)
	}
	render() {
		return (
			<View style={idnexStyle.scanWrap}>
				<RNCamera
					ref={ref => {
						this.camera = ref
					}}
					style={idnexStyle.preview}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					onBarCodeRead={this.onBarCodeRead}>
					<View style={indexStyle.rectangleContainer}>
						<View style={indexStyle.rectangle} />
						<Animated.View 
						style={[
							indexStyle.border,
							{ transform: [{ translateY: this.state.moveAnim }] }]}/>
						<Text style={indexStyle.rectangleText}>将二维码放入框内，即可自动扫描</Text>
					</View>
				</RNCamera>
			</View>
		)
	}
}

export default ScanScreen
