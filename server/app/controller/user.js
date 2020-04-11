'use strict'

const Controller = require('egg').Controller;

class UserController extends Controller {
	async info() {
		const { ctx } = this
		ctx.body = 'hi, user'
	}

	async signup() {
		const { ctx } = this
		const info = ctx.request.body
		const res = await ctx.service.user.signup(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}
	async findUsr() {
		const { ctx } = this
		const info = ctx.request.body
		const res = await ctx.service.user.findUsr(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}

	async signin() {
		const { ctx } = this
		const info = ctx.request.body
		const res = await ctx.service.user.signin(info)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}

	async signout() {

	}
	async editSignDays() {

	}

	async editMessage() {
		try {
			const { ctx } = this
			const info = ctx.request.body
			console.log('info', info)
			const res = await ctx.service.user.postMessage(info)
			ctx.body = {
				status: 200,
				data: res
			}
			ctx.set('Access-Control-Allow-Origin', '*')
			ctx.set('Access-Control-Allow-Method', '*')
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = UserController
