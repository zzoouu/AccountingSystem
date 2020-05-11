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
	async getBudgetInfo(userinfo) {
		const { _id } = userinfo
		const list = await this.app.mysql.select('budgets', {
			where: {
				_id
			}
		})
		// console.log(list)
		return {
			code: 1,
			list
		}
	}
	async editBudgetInfo(info, userinfo) {
		const { _id } = userinfo
		// 若传过来 budget_id,则为更新，若无，则为创建
		let { budget_id } = info
		if (budget_id) {
			const res = await this.app.mysql.update('budgets', info, {
				where: {
					_id,
					budget_id
				}
			})
		} else {
			budget_id = uuidv1()
			const content = Object.assign({}, info, {
				_id,
				budget_id
			})
			await this.app.mysql.insert('budgets', content)
		}
		return {
			msg: 'OK',
			budget_id
		}
	}
}
module.exports = BudgetService
