import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
const { width, height } = Util.size

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    choseTab: {
        width: 160,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        alignSelf: 'center'
    },
    tabItem: {
        width: 80,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E0E0E0',
        borderWidth: 0.7
    },
    choseTabItem: {
        borderColor: '#FFA500',
    },
    borderRadius: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    partIcons: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#EEE9E9',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    iconText: {
        marginTop: 10,
        fontSize: 14,
        color: '#757575'
    },
    modal: {
        width: width,
        height: height - 40,
        marginTop:130,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center'
    },
    head: {
        flexDirection: 'row',
        width: width,
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 40,
        paddingRight: 40,
    },
    headText: {
        color: '#8B8682'
    },
    confirmText: {
        color: 'green'
    }
})
export default styles
