import { observable, action } from 'mobx'
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
	constructor() {
		this.budgetInfo = getBudgetInfo()
	}
	@action
	getListDate = () => {
		// demo
	}
	@action
	setBudgetType = type => {
		this.budgetInfo.budgetType = type
	}

	@action
	setTotalBudget = budget => {
		this.budgetInfo.budget.totalBudget = budget
	}
	@action
	setIsBudgetAllow = flag => {
		this.budgetInfo.isBudgetAllowed = flag
	}
}
const budgetStore = new BudgetStore()
export default budgetStore
