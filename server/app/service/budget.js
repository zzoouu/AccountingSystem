'use strict'
const Service = require('egg').Service
const uuidv1 = require('./util')

class BudgetService extends Service {
	async getBudget() {
		const info = await this.app.mysql.select('budget', {
			orders: [['date', 'desc']], // desc 降序
			limit: 1
		})
		const list = await this.app.mysql.select('budget')
		console.log(list)
		console.log('getbudget', info[0])
		return {
			msg: 'OK',
			budgetInfo: info[0]
		}
	}
	async editBudget(info) {
		const budget_id = uuidv1()
		const {
			budget_type,
			isBudget,
			total_budget
		} = info
		const res = await this.app.mysql.insert('budget', {
			budget_id,
			isBudget,
			total_budget,
			budget_type,
			date: new Date()
		})
		return {
			msg: 'OK',
			budget_id
		}
	}
}
module.exports = BudgetService
