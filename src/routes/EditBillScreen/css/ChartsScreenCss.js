import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'
const { width, height } = Util.size

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#fff',
    },
    dateModal: {
		flex: 0,
        // height: height * 0.15,
        height: 102,
		marginTop: height * 0.26,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: width * 0.7,
        marginLeft: width * 0.15,
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: 8,
	},
	dateModalHead: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
    },
    selfText: {
        // color: 'blue',
        width: width * 0.35,
        textAlign: 'center',
        fontSize: 16,
    },
    selfModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        width: width * 0.7,
        borderBottomColor: '#EED5D2',
        borderBottomWidth: 0.8,
        paddingLeft: 10,
        paddingRight: 5,
    },
    selfadap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    textinput: {
        width: 60,
        height: 30,
        lineHeight: 30,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        textAlign: 'center',
        
        backgroundColor: '#EED5D2'
    },

    dateModalTime: {
		borderRightWidth: 1,
		borderRightColor: '#C1FFC1'
    },
    commandsLine: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width,
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.5
    },
    lineText: {
        fontSize: 14,
        paddingRight: 5,
    },
    splitLine: {
        borderLeftColor: 'black',
        borderLeftWidth: 1,
        marginLeft: 8
    },
    sumItem: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        paddingTop: 8
    },
    choseSumItem: {
        backgroundColor: '#FFE4E1'
    },
    sumText: {
        marginTop: 8,
        color: '#6C6C6C',
        fontSize: 12
    },
    timePicker: {
        // backgroundColor: '#00CACA',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: width * 0.4,
        paddingLeft: 4,
        paddingRight: 4
    },
    borderRadius: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    charts: {
        width,
        // height: 800,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center'
    },
    chartLine: {
        width: 160,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    chartTab: {
        width: 80,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E0E0E0',
        borderWidth: 0.7
    },
    choseChartTab: {
        borderColor: '#FFA500',
    },
    recordList: {
        backgroundColor: '#fff',
        width,
        marginBottom: 20
    },
    recordItem: {
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 0.3,
        justifyContent: 'center',
        height: 60,
        paddingLeft: 18,
        paddingRight: 18,
    },
    itemLabel: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        marginRight: 8,
    },
    itemText: {
        color: '#6C6C6C',
        fontSize: 12,
        marginRight: 8
    },
    itemProgress: {
        width: width * 0.9
    }
})

export const progressInfo = {
	totalWidth: width * 0.9,
	totalHeight: height * 0.25 * 2 / 5 * 0.5,
	itemWidth: width * 10 / 12
}
