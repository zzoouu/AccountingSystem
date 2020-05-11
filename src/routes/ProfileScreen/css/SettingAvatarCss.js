import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        height: 150,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    avatar: {
        width: 80,
        height: 80,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    }
})
export default styles
