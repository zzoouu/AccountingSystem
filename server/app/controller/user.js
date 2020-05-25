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
		const userinfo = Object.assign({}, info, {
			_id: res._id
		})
		ctx.session.userinfo = userinfo
		console.log('in session', ctx.session.userinfo)
		ctx.cookies.set('userinfo', ctx.session.userinfo)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}

	async signout() {
		const { ctx } = this
		ctx.session.userinfo = null
		ctx.cookies.set('userinfo', ctx.session.userinfo)
		ctx.body = {
			status: 200
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}
	async getSignDays() {
		const { ctx } = this
		const { userinfo } = ctx.session
		const info = await ctx.service.user.getSignDays(userinfo)
		ctx.body = {
			status: 200,
			data: info
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}
	async editSignDays() {
		const { ctx } = this
		const params = ctx.request.body
		const { userinfo } = ctx.session
		const info = await ctx.service.user.editSignDays(userinfo, params)
		ctx.body = {
			status: 200,
			data: info
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
	}
	async updateUserinfo() {
		const { ctx } = this
		const info = ctx.request.body
		const { userinfo } = ctx.session
		const res = await ctx.service.user.updateUserinfo(info, userinfo)
		ctx.session.userinfo.username = res.username
		ctx.cookies.set('userinfo', ctx.session.userinfo)
		ctx.body = {
			status: 200,
			data: res
		}
		ctx.set('Access-Control-Allow-Method', '*')
		ctx.set('Access-Control-Allow-Origin', '*')
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
