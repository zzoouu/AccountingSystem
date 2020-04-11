'use strict'
const Service = require('egg').Service
const uuidv1 = require('./util')
const uuidv3 = require('uuid').v3

class UserService extends Service {
	async find(uid) {
		const user = await this.ctx.db.query('select * from user where uid = ?', uid)
		return {
			name: user.user_name
		}
	}
	async postMessage(info) {
		// _id
		const { message } = info
		const message_id = uuidv1()
		const data = {
			message_id,
			date: new Date(),
			message
		}
		const res = await this.app.mysql.insert('message', data)
		console.log(res)
		return {
			msg: 'OK',
			message_id
		}
	}
	async signup(info) {
		let { phone, ...params } = info
		const _id = uuidv3(phone.toString(), uuidv3.URL).replace(/-/g, '')
		const hasId = await this.app.mysql.select('userinfo', {
			where: {
				_id
			}
		})
		let data = {}
		if (hasId.length) {
			data = {
				code: -1,
				msg: '手机号码已经存在，请换一个'
			}
		} else {
			params = Object.assign({}, params, { _id })
			const res = await this.app.mysql.insert('userinfo', params)
			data = {
				code: 1,
				_id
			}
		}
		return data
	}
	async findUsr(info) {
		const res = await this.app.mysql.select('userinfo', {
			where: {
				username: info.username
			}
		})
		const ret = (res.length === 0) ? Boolean(false) : Boolean(true)
		console.log(res, ret)
		return ret
	}
	async signin(info) {
		const { username, password } = info
		const res = await this.app.mysql.select('userinfo', {
			where: {
				username
			}
		})
		let data
		if (res.length) {
			const userinfo = res[0]
			console.log(res)
			if (userinfo.password === password) {
				data = {
					code: 1,
					_id: userinfo._id
				}
				return data
			}
		}
		data = {
			code: -1,
			msg: '用户名或者密码错误，请重新输入'
		}
		return data
	}
}
module.exports = UserService
