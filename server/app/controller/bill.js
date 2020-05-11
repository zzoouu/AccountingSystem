'use strict'

const Controller = require('egg').Controller

class BillController extends Controller {
	async billinfo() {
		const { ctx } = this
		// console.log(ctx.params)
		// const userinfo = await ctx.service.user.find(....)
		// ctx.status = 200
		ctx.body = {
			status: 200,
			data: {
				user: 'zzoouu',
			}
		}
		ctx.set('Content-Type', 'application/json')
		// 跨域
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async editBill111() {
		const { ctx } = this
		const body = ctx.request.body
		const billInfo = await ctx.service.bill.editBillInfo()
		console.log('bill', billInfo)
		ctx.body = {
			status: 200,
			data: {
				name: 'edit ok',
				body
			}
		}
		ctx.set('Content-Type', 'application/json')
		// 跨域
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}

	async getBills() {
		try {
			const { ctx } = this
			// const { username } = ctx.request.body
			console.log(ctx.session.userinfo)
			const { username } = ctx.session.userinfo
			const res = await ctx.service.bill.getBills(username)
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
	async getBillInfoById() {
		const { ctx } = this
		const bill_id = ctx.params.bill_id
		const res = await ctx.service.bill.getBillInfoById(bill_id)
		ctx.body = {
			status: 'OK',
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async getBillById() {
		const { ctx } = this
		const bill_id = ctx.params.bill_id
		const res = await ctx.service.bill.getBillById(bill_id)
		ctx.body = {
			status: 'OK',
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async getBillRecords() {
		const { ctx } = this
		const { userinfo } = ctx.session
		const res = await ctx.service.bill.getBillRecords(userinfo)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async createBill() {
		try {
			const { ctx } = this
			const info = ctx.request.body
			const res = await ctx.service.bill.createBill(info)
			ctx.body = {
				status: 200,
				data: res
			}
			ctx.set('Content-Type', 'application/json')
			// 跨域
			ctx.set('Access-Control-Allow-Origin', '*')
			ctx.set('Access-Control-Allow-Method', '*')
		} catch (e) {
			console.log('e', e)
		}
	}
	async editBillRecord() {
		const { ctx } = this
		const info = ctx.request.body
		const res = await ctx.service.bill.editBillRecord(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async deleteRecord() {
		const { ctx } = this
		const { record_id } = ctx.params
		const res = await ctx.service.bill.deleteRecord(record_id)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async deleteBill() {
		const { ctx } = this
		// const { bill_id } = ctx.params
		const info = ctx.request.body
		console.log('info', info)
		const res = await ctx.service.bill.deleteBill(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	async changeBill() {
		const { ctx } = this
		const info = ctx.request.body
		const res = await ctx.service.bill.changeBill(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.set('Access-Control-Allow-Method', '*')
	}
	// ctx.params.xx; ctx.query.xxx
	// http://127.0.0.1:7001/user/:id/:name
	// http://127.0.0.1:7001/search?name=egg
}

module.exports = BillController

/**
 * ctx.query	 /home?key=111
 * ctx.queries /home?key=111&name=xxx
 * ctx.params  /home/:id
 * ctx.request.body    post
 * ctx.response.body
 * ctx.cookies
 */
