import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default class RecommendScreen extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            logo: undefined,
            value: undefined
        }
	}
	async componentDidMount() {
        const value = {
			name: '邹邹记账',
			v: 1.0,
			features: '这是一款集多人账本与单人账本于一体的记账软件，主要有账本管理、收支管理、预算管理、用户管理等四个方面'
        }
        this.setState({
			value: JSON.stringify(value),
			// logo: undefined
        })
    }
    // getUserinfo = async () => {
	// 	const userinfo = await getUserinfo()
	// 	// avatar: 
    //     this.setState({
    //         logo: userinfo.avatar
    //     })
    // }
	render() {
		const { logo, value } = this.state
        return (
            <View style={styles.container}>
				<Text style={styles.txt}>推荐二维码</Text>
                <QRCode
                    style={styles.qrcode}
                    value={value}
                    size={250}
                    logo={logo}
                    logoSize={40}
                    logoBackgroundColor="white"
                    logoMargin={3}
                />
            </View>
        )
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		paddingTop: 60,
		alignItems: 'center'
	},
	txt: {
		marginBottom: 20,
		fontSize: 20
	}
})