import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../css/SettingAvatarCss'
import { getUserinfo } from '../../../utils/storage'

class SettingAvatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: {},
            text: '您还未登录，请先登录~'
        }
    }
    async componentDidMount() {
        const userinfo = await getUserinfo()
        if (userinfo) {
            // console.log(userinfo)
            this.setState({
                avatar: userinfo.avatar
            })
        }
    }
    render() {
        const { avatar, text } = this.state
        return (
            <View style={styles.container}>
                {
                    avatar ? (
                        <>
                            <View style={styles.head}>
                                <Image source={avatar} style={styles.avatar} />
                            </View>
                        </>
                    ) : (
                    <Text>{text}</Text>
                    )
                }
            </View>
        )
    }
}
export default SettingAvatar
