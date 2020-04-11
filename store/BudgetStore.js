import { observable, action } from 'mobx'
import { get, post } from '../src/utils/fetch'
import Router from '../router'
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
	constructor() {
		this.budgetInfo = getBudgetInfo()
		this.budgetSettings = undefined
		this.handleConfirm = false
	}
	@action
	getListDate = () => {
		// demo
	}
	@action
	setHandleConfirm = flag => {
		this.handleConfirm = flag
	}
	@action
	getBudgetSetting = async () => {
		try {
			const res = await get({
				url: Router.budgetUrl.budget
			})
			this.budgetSettings = res.data.budgetInfo
			return res.data.budgetInfo
		} catch (e) {
			console.log('e', e)
		}
	}
	@action
	setBudget = async (body) => {
		const res = await post({
			url: Router.budgetUrl.editBudget,
			body
		})
		this.getBudgetSetting()
		// console.log('res', res.data)
		return res.data
	}
}
const budgetStore = new BudgetStore()
export default budgetStore
