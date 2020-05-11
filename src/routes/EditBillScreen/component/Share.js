import React from 'react'
import { View, Text } from 'react-native'
import styles from '../css/ShareCss'
import QRCode from 'react-native-qrcode-svg'
import { getUerinfo, getUserinfo } from '../../../utils/storage'

class ShareScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logo: undefined,
            value: undefined
        }
    }
    async componentDidMount() {
        await this.getUserinfo()
        const { route: {
            params: {
                bill_id,
                isShared,
                members,
            }
        } } = this.props
        const value = {
            bill_id,
            members,
            isShared
        }
        this.setState({
            value: JSON.stringify(value)
        })
    }
    getUserinfo = async () => {
        const userinfo = await getUserinfo()
        this.setState({
            logo: userinfo.avatar
        })
    }
    render() {
        const { logo, value } = this.state
        return (
            <View style={styles.container}>
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
export default ShareScreen
