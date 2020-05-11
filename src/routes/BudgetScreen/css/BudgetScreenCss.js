import { StyleSheet } from 'react-native'
import Util from '../../../utils/deviceInfo'

const { width, height } = Util.size
export const progressInfo = {
	totalWidth: width * 0.9,
	totalHeight: height * 0.25 * 2 / 5 * 0.5,
	itemWidth: width * 10 / 12
}
export const styles = StyleSheet.create({
	budgetContainer: {
		flex: 0
	},
	header: {
		flex: 0,
		backgroundColor: '#ffffff',
		height: height * 0.25,
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 15
	},
	number: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	money: {
		flex: 4,
		fontSize: 30
	},
	numberText: {
		flex: 2
	},
	progressWrapper: {
		flex: 2,
		alignItems: 'center',
	},
	progress: {
		// flex: 1,
	},
	progressLabel: {
		flex: 0,
		height: progressInfo.totalHeight,
		flexDirection: 'row',
		width: progressInfo.totalWidth,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	progressRate: {
		flex: 1
	},
	body: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// height: 70,
		borderBottomWidth: 0.5,
		borderBottomColor: '#E0E0E0'
	},
	itemLabel: {
		flex: 10,
		justifyContent: 'space-around'
	},
	itemIcon: {
		flex: 1,
		textAlign: 'center'
	},
	itemlabelText: {
		height: 40,
		fontSize: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	remainMoney: {
		fontSize: 12,
		color: '#999d9c'
	},
	itemProgress: {
		// flex: 0
	},
	setInfo: {
		flexDirection: 'row',
		height: 35,
		alignItems: 'center',
	},
	itemInfoText: {
		fontSize: 12,
		color: '#BB3D00'
	}
})
