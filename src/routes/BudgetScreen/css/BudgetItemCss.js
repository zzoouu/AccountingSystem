import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'

const { width, height } = Util.size

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 5
    },
    item: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.6,
    },
    icon: {
        marginRight: 8
    },
    labelText: {
        marginRight: 6
    },
    confirmButton: {
        backgroundColor: '#fcaf17',
        marginTop: 20,
        width: width * 0.85,
        height: 30,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    }
})
export default styles
