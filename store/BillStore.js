import { observable, action, toJS } from "mobx"
import { post, get, del, put } from '../src/utils/fetch'
import Router from '../router'

const getConsumptionTags = () => {
	//Ionicons
	const consumptionTags = [
		{
			icon: 'directions-subway',
			label: '交通',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-hospital',
			label: '医疗',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'home',
			label: '租房',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'opacity',
			label: '水',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'lightbulb-outline',
			label: '电',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-phone',
			label: '通讯',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-mall', // accessibility
			label: '服饰',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-dining',
			label: '餐饮',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-shipping',
			label: '快递',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'fitness-center', // pool
			label: '健身',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'face',
			label: '护肤品',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'shopping-cart',
			label: '日用',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'stay-current-portrai',
			label: '红包',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'card-giftcard',
			label: '社交',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'credit-card',
			label: '还贷',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'desktop-mac',
			label: '数码',
			key: 1, // key: 1代表显示在初始界面，0则不显示在初始界面
			type: 'MaterialIcons'
		},
		{
			icon: 'local-library',
			label: '学习',
			key: 1,
			type: 'MaterialIcons'
		},
		{
			icon: 'local-movies',
			label: '娱乐',
			key: 1,
			type: 'MaterialIcons'
		}
	]
	return consumptionTags
}

const getBillInfo = () => {
	return {
	}
}

const getBills222 = () => {
	return [
		{
			color: '#FF8C69',
			title: '账本一',
			isShare: true
		},
		{
			color: '#B3EE3A',
			title: '账本2',
			isShare: true
		},
		{
			color: '#FF8C69',
			title: '账本3',
			isShare: false
		},
		{
			color: '#B3EE3A',
			title: '账本2',
			isShare: true
		},
		{
			color: '#FF8C69',
			title: '账本3',
			isShare: false
		},
		{
			color: '#B3EE3A',
			title: '账本2',
			isShare: true
		},
		{
			color: '#FF8C69',
			title: '账本3',
			isShare: false
		}
	]
}
class BillStore {
	// @observable billInfo
	@observable consumptionTags
	@observable bills
	@observable billRecords
	@observable settingShow
	constructor() {
		this.profileInfo = getBillInfo()
		this.consumptionTags = getConsumptionTags()
		this.bills = []
		// this.billInfo = []
		this.billRecords = []
		this.settingShow = false
	}
	@action
	setBillInfoSetting = bool => {
		this.settingShow = bool
	}
	@action
	createBill = async (info) => {
		try {
			const res = await post(
				{
					url: Router.billUrl.createBill,
					body: info
				}
			)
			console.log(res)
			return res.data
		} catch (e) {
			console.log('e', e)
			return e
		}
	}
	@action
	updateBill = async (info) => {
		try {
			const res = await put({
				url: `${Router.billUrl.editBill}/${info.bill_id}`,
				body: info
			})
		} catch(e) {}
	}
	@action
	getBills = async () => {
		try {
			const res = await get({
				url: Router.billUrl.bills,
			})
			this.bills = res.data.bills
		} catch(e) {
			console.log('e', e)
			return e
		}
	}
	@action
	editBillRecord = async (params) => {
		try {
			const res = await post({
				url: `${Router.billUrl.editBill}/${params.bill_id}`,
				body: params
			})
			console.log(res)
			return res.data
		} catch (e) {
		}
	}
	@action
	getBillById = async (bill_id) => {
		try {
			const res = await get({
				url: `${Router.billUrl.bill}/${bill_id}`,
			})
			this.billRecords = res.data.data
			return res.data
		} catch(e) {

		}
	}
	@action
	deleteBillById = async bill_id => {
		console.log(bill_id)
		try {
			const res = await del({
				url: `${Router.billUrl.bills}/${bill_id}`
			})
			console.log(res)
			this.getBills()
		} catch(e) {}
	}
	@action
	deleteRecordById = async (bill_id, record_id) => {
		try {
			const res = await del({
				url: `${Router.billUrl.bill}/${record_id}`
			})
			this.getBillById(bill_id)
		} catch (e) {

		}
	}
}
const billStore = new BillStore()
export default billStore

