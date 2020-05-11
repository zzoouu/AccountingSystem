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
		const { message, _id } = info
		const message_id = uuidv1()
		const data = {
			message_id,
			date: new Date(),
			message,
			_id
		}
		const res = await this.app.mysql.insert('message', data)
		console.log(res)
		return {
			code: 1,
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
	async updateUserinfo(info) {
		const { _id, ...params } = info
		const res = await this.app.mysql.update('userinfo', params, {
			where: {
				_id
			}
		})
		const username = await this.app.mysql.select('userinfo', {
			where: {
				_id
			},
			columns: ['username']
		})
		return {
			code: 1,
			username: username[0].username
		}
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
			const { _id, avatar } = userinfo
			const unit8array = new Uint8Array(avatar)
			const str = String.fromCharCode(...unit8array)
			const decodeURL = decodeURIComponent(escape(str))
			if (userinfo.password === password) {
				data = {
					code: 1,
					_id,
					avatar: decodeURL,
					sign_days: userinfo.sign_days ? userinfo.sign_days : 0
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
	async getSignDays(userinfo) {
		const { _id } = userinfo
		if (_id) {
			const info = await this.app.mysql.select('userinfo', {
				where: {
					_id
				},
				columns: [ 'sign_days', 'lastdate' ]
			})
			return {
				code: 1,
				data: info[0]
			}
		}
	}
	async editSignDays(userinfo, params) {
		const { _id } = userinfo
		if (_id) {
			const info = await this.app.mysql.get('userinfo', { _id })
			const { sign_days, lastdate } = info
			let date = new Date()
			let days
			if (!lastdate) {
				days = 1
			} else {
				const newYear = date.getFullYear()
				const newMonth = date.getMonth()
				const newDate = date.getDate()
				const oldYear = lastdate.getFullYear()
				const oldMonth = lastdate.getMonth()
				const oldDate = lastdate.getDate()
				if ((newYear === oldYear) && (newMonth === oldMonth) && (oldDate + 1 === newDate)) {
					days = sign_days + 1
				} else if ((newYear === oldYear) && (newMonth === oldMonth) && (oldDate === newDate)) {
					if (params.flag === 1) {
						days = sign_days + 1
					} else {
						days = sign_days - 1
					}
				} else {
					days = 1
				}
			}
			const res = await this.app.mysql.update('userinfo', {
				sign_days: days,
				lastdate: date
			}, {
				where: { _id }
			})
			console.log(res)
			return {
				code: 1,
				sign_days: days
			}
		}
	}
}
module.exports = UserService
