import { observable, action, toJS } from "mobx"
import { post, get, del, put } from '../src/utils/fetch'
import Router from '../router'
import { getUserinfo } from '../src/utils/storage'
// import storage from "../src/utils/storage"
// import { incomeIcons, payIcons } from '../src/utils/const'

export let incomeIcons = [
	{
		icon: 'gongzi',
		label: ' 工资',
		flag: 1  // 1 添加 0 未添加
	},
	{
		icon: 'hongbao',
		label: '红包',
		flag: 1
	},
	{
		icon: 'licai',
		label: ' 理财',
		flag: 0
	},
	{
		icon: 'get',
		label: '外快',
		flag: 0
	},
	{
		icon: 'shenghuofei1',
		label: '生活费',
		flag: 1
	},
	{
		icon: 'baoxiao',
		label: '报销',
		flag: 1
	},
	{
		icon: 'touzi',
		label: '投资',
		flag: 0
	},
	{
		icon: 'weibiaoti__',
		label: '公积金',
		flag: 1
	},
	{
		icon: 'tuikuan',
		label: '退款',
		flag: 1
	},
	{
		icon: 'jiangxuejin',
		label: '奖学金',
		flag: 1
	},
	{
		icon: 'jixiaojiangjin',
		label: '绩效奖金',
		flag: 1
	},
	{
		icon: 'tuishui',
		label: '退税',
		flag: 1
	}
]

export let payIcons = [
	{
		icon: 'huazhuangpin',
		label: '化妆品',
		flag: 1
	},
	{
		icon: 'hufupin',
		label: '护肤品',
		flag: 1
	},
	{
		icon: 'zufang',
		label: '租房',
		flag: 1
	},
	{
		icon: 'hongbao',
		label: '红包',
		flag: 1
	},
	{
		icon: 'jiaotong',
		label: '交通',
		flag: 1
	},
	{
		icon: 'shuifei',
		label: '水费',
		flag: 1
	},
	{
		icon: 'dianfei',
		label: '电费',
		flag: 1
	},
	{
		icon: 'kuaidi',
		label: '快递',
		flag: 1
	},
	{
		icon: 'shejiao',
		label: '社交',
		flag: 1
	},
	{
		icon: 'huafei',
		label: '话费',
		flag: 1
	},
	{
		icon: 'canyin',
		label: '餐饮',
		flag: 1
	},
	{
		icon: 'xuexi',
		label: '学习',
		flag: 1
	},
	{
		icon: 'bag',
		label: '衣物鞋包',
		flag: 1
	},
	{
		icon: 'digital',
		label: '数码',
		flag: 0
	},
	{
		icon: 'yiliao',
		label: '医疗',
		flag: 0
	},
	{
		icon: 'yule',
		label: '娱乐',
		flag: 1
	},
	{
		icon: 'weixiu',
		label: '维修',
		flag: 1
	},
	{
		icon: 'cat_4',
		label: '日用品',
		flag: 1
	},
	{
		icon: 'elders',
		label: '长辈',
		flag: 0
	},
	{
		icon: 'haizi',
		label: '孩子',
		flag: 0
	},
	{
		icon: 'lvxing',
		label: '旅行',
		flag: 0
	},
	{
		icon: '222222228',
		label: '宠物',
		flag: 0
	},
	{
		icon: 'lijin',
		label: '礼金',
		flag: 0
	},
	{
		icon: 'yanjiu',
		label: '烟酒',
		flag: 0
	},
	{
		icon: 'daikuan',
		label: '贷款',
		flag: 0
	},
	{
		icon: 'jianshen',
		label: '健身',
		flag: 0
	}
]

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

class BillStore {
	// @observable billInfo
	@observable consumptionTags
	@observable bills
	@observable billInfo
	@observable billRecords
	@observable settingShow
	@observable incomeIcons
	@observable payIcons
	@observable defaultIcons
	@observable payiconArr
	@observable iniconArr
	constructor() {
		this.profileInfo = getBillInfo()
		this.consumptionTags = getConsumptionTags()
		this.bills = []
		this.billInfo = {}
		this.billRecords = []
		this.settingShow = false
		this.incomeIcons = incomeIcons
		this.payIcons = payIcons
		this.defaultIcons = []
		this.payiconArr = []
		this.iniconArr = []
	}
	@action
	getDefaultIcons = () => {
		const incomeArr = toJS(this.incomeIcons)
		const payArr = toJS(this.payIcons)
		this.payiconArr = payArr.filter(item => item.flag === 1)
		this.iniconArr = incomeArr.filter(item => item.flag === 1)
		// this.defaultIcons = arr
		// console.log(toJS(this.defaultIcons))
	}
	@action
	setTotalIcons = (type, arr) => {
		if (type === 'Income') {
			incomeIcons = arr
			this.incomeIcons = arr
		} else {
			this.payIcons = arr
			this.payIcons = arr
		}
		this.getDefaultIcons()
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
			this.getBills()
			return res.data
		} catch (e) {
			console.log('e', e)
			return e
		}
	}
	@action
	updateBill = async (info) => {
		try {
			console.log('update', info)
			const res = await put({
				url: `${Router.billUrl.editBill}/${info.bill_id}`,
				body: info
			})

			this.getBills({ username: info.author })
		} catch (e) { }
	}
	@action
	getBills = async () => {
		try {
			const userinfo = await getUserinfo()
			if (userinfo) {

				const res = await get({
					url: Router.billUrl.bills,
				})
				console.log(res.data.bills)
				this.bills = res.data.bills
			} else {
				this.bills = []
			}
		} catch (e) {
			console.log('e', e)
			this.bills = []
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
	getBillInfoById = async (bill_id) => {
		try {
			const res = await get({
				url: `${Router.billUrl.bills}/${bill_id}`
			})
			this.billInfo = res.data.data
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
		} catch (e) {

		}
	}
	@action
	deleteBillById = async (info) => {
		console.log(info)
		const { bill_id } = info
		try {
			const res = await del({
				url: `${Router.billUrl.bills}/${bill_id}`,
				body: info
			})
			console.log(res)
			this.getBills()
		} catch (e) { }
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

