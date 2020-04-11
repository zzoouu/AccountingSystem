'use strict'

const Controller = require('egg').Controller

class BudgetController extends Controller {
	async editBudget() {
		try {
			const { ctx } = this
			const info = ctx.request.body
			const res = await ctx.service.budget.editBudget(info)
			ctx.body = {
				status: 200,
				data: res
			}
			ctx.set('Access-Control-Allow-Method', '*')
			ctx.set('Access-Control-Allow-Origin', '*')
		} catch(e) {

		}
	}
	async getBudget() {
		try {
			const { ctx } = this
			const res = await ctx.service.budget.getBudget()
			ctx.body = {
				status: 200,
				data: res
			}
			ctx.set('Access-Control-Allow-Origin', '*')
			ctx.set('Access-Control-Allow-Method', '*')
		} catch (e) {
			console.log('e', e)
		}
	}
	async editBudgetInfo(){

	}
	async getBudgetInfo(){

	}
}
module.exports = BudgetController
