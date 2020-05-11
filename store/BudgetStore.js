import { observable, action } from 'mobx'
import { get, post } from '../src/utils/fetch'
import Router from '../router'
import { getUserinfo } from '../src/utils/storage'
const getBudgetInfo = () => {
	return {
		budgetType: 'month',
		isBudgetAllowed: true,
		budget: {
			totalBudget: 0,
			list: [
				{
					key: 'shopping',
					label: '购物',
					budget: undefined,
					icon: 'cart'
				},
				{
					key: 'shopping',
					label: '购物',
					budget: undefined,
					icon: 'cart'
				},
				{
					key: 'shopping',
					label: '购物',
					budget: undefined,
					icon: 'cart'
				},
				{
					key: 'shopping',
					label: '购物',
					budget: undefined,
					icon: 'cart'
				},
				{
					key: 'shopping',
					label: '购物',
					budget: undefined,
					icon: 'cart'
				}
			]
		}
	}
}
class BudgetStore {
	@observable budgetInfo
	@observable budgetSettings
	@observable handleConfirm
	@observable budgetItems
	@observable refreshBudgets
	constructor() {
		this.budgetInfo = getBudgetInfo()
		this.budgetSettings = undefined
		this.handleConfirm = false
		this.budgetItems = []
		this.refreshBudgets = undefined
	}

	@action
	setRefreshBudgets = func => {
		this.refreshBudgets = func
	}
	@action
	setHandleConfirm = flag => {
		this.handleConfirm = flag
	}
	@action
	getBudgetSetting = async () => {
		try {
			const userinfo = await getUserinfo()
			if (userinfo) {
				const res = await get({
					url: Router.budgetUrl.budget
				})
				this.budgetSettings = res.data.budgetInfo
				console.log(res.data.budgetInfo)
				return res.data.budgetInfo
			} else {
				this.budgetSettings = undefined
			}
		} catch (e) {
			console.log('e', e)
		}
	}
	@action
	getBudgetItem = async () => {
		try {
			const userinfo = await getUserinfo()
			if (userinfo) {
				const res = await get({
					url: Router.budgetUrl.budgetInfo
				})
				this.budgetItems = res.data.list
				// console.log(res.data.list)
				return res.data.list
			} else {
				// this.budgetSettings = undefined
			}
		} catch (e) {
			console.log('e', e)
		}
	}
	@action
	setBudgetItem = async (body) => {
		const res = await post({
			url: Router.budgetUrl.budgetInfo,
			body
		})
		await this.getBudgetItem()
		return res.data
	}
	@action
	setBudget = async (body) => {
		const res = await post({
			url: Router.budgetUrl.editBudget,
			body
		})
		await this.getBudgetSetting()
		// console.log('res', res.data)
		return res.data
	}
}
const budgetStore = new BudgetStore()
export default budgetStore