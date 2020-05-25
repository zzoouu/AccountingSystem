'use strict'
const Service = require('egg').Service
const createUuid = require('./util')
const uuidv3 = require('uuid').v3

class BillService extends Service {
	async editBillinfo(billinfo) {

		const billInfo = await this.app.mysql.query('select * from bill')
		// sql = update bill set bill_id = REPLACE(UUID(), "-", "") where user_name = xxx
		// insert into bill (`bill_id`) values (REPLACE(UUID(), "-", ""))
		return billInfo
	}
	async createBill(info) {
		const {
			billName: bill_name,
			isShared,
			color,
			members
		} = info
		const uuid = createUuid()
		const searchName = await this.app.mysql.get('bills', { bill_name })
		if (!searchName) {
			const res = await this.app.mysql.insert('bills', {
				bill_id: uuid,
				bill_name,
				isShared,
				color,
				members: members.join(',')
			})
			if (res.affectedRows === 1) {
				return {
					code: 1,
					bill_id: uuid
				}
			}
		} else {
			return {
				msg: '账本名称重复，请重新输入',
				bill_id: undefined
			}
		}
	}
	async getBills(username) {
		// console.log(username, 'username')
		// 模糊查询
		const sql = `select * from bills where members like "%${username}%"`
		const bills = await this.app.mysql.query(sql)
		// const bills = await this.app.mysql.select('bills')
		// const res = bills.filter(bill => {
		// 	const { members } = bill
		// 	const arr = members.split(',')
		// 	return arr.includes(username)
		// })
		return {
			msg: 'OK',
			bills
		}
	}
	async editBillRecord(info) {
		const {
			bill_id,
			record_name,
			money,
			desc = undefined,
			author = undefined,
			record_type,
			icon
		} = info
		const record_id = createUuid()
		const res = await this.app.mysql.insert('bill', {
			record_id,
			bill_id,
			record_name,
			record_date: new Date(),
			money,
			author,
			desc,
			record_type,
			icon
		})
		// res.affectedRows === 1
		console.log('server', res)
		return {
			msg: 'OK',
			record_id
		}
	}
	async getBillInfoById(bill_id) {
		const billinfo = await this.app.mysql.select('bills', {
			where: { bill_id }
		})
		if (billinfo.length) {
			return {
				msg: 'OK',
				data: billinfo[0]
			}
		}
	}
	async getBillById(bill_id) {
		const billinfo = await this.app.mysql.select('bill', {
			where: { bill_id },
			orders: [['record_date', 'desc']]
		})
		return {
			msg: 'OK',
			data: billinfo
		}
	}
	async getBillRecords(userinfo) {
		// console.log('records', userinfo)
		let data
		if (userinfo) {
			// const sql = `select * from bill where author like "%${userinfo.username}%"`
			const bills = await this.getBills(userinfo.username)
			const ids = bills.bills.map(item => item.bill_id)
			const records2 = await this.app.mysql.select('bill', {
				where: {
					bill_id: ids
				},
				orders: [[ 'record_date', 'desc' ]]
			})
			records2.map(item => {
				const { bill_id } = item
				const members = bills.bills.find(item => item.bill_id === bill_id).members
				const num = members.split(',').length
				item.number = num
			})
			// console.log(bills, ids)
			// records2.map(item => item.numbers = )
			// const records = await this.app.mysql.select('bill', {
			// 	where: {
			// 		author: userinfo.username
			// 	},
			// 	orders: [[ 'record_date', 'desc' ]]
			// })
			// const records2 = await this.app.mysql.query(sql)
			// console.log('records', bills, ids, records2)
			data = records2
		} else {
			data = []
		}
		return {
			msg: 'OK',
			data
		}
	}
	async deleteRecord(record_id) {
		const res = await this.app.mysql.delete('bill', {
			record_id
		})
		return record_id
	}
	async deleteBill(info) {
		const { bill_id, author, members } = info
		console.log('mem', info)
		const len = members.split(',').length
		console.log('len', len)
		if (len > 1) {
			// 共享账本 则不删除账本，只是该用户不再拥有该账本
			const arr = members.split(',')
			const newMembers = arr.filter(item => item !== author)
			const res = await this.changeBill({ bill_id, author, members: newMembers.join(',') })
			// 删除账本中该用户的单笔记录
			const delBill = await this.app.mysql.select('bill', {
				where: {
					bill_id,
					author
				}
			})
			console.log('delBill', delBill)
		} else {
			console.log(bill_id)
			// 单人账本，直接删除
			const res = await this.app.mysql.delete('bills', {
				bill_id
			})
		}
		// const sql = `delete from bills where bill_id = ${bill_id} and members like "%${author}%"`
		return bill_id
	}
	async changeBill(info) {
		const { bill_id, author, ...params } = info
		console.log('params', params, bill_id)
		const res = await this.app.mysql.update('bills', params, {
			where: {
				bill_id
			}
		})
		return res
	}
}
module.exports = BillService

/**
 * 查询
 * this.app.mysql.get('billinfo', {bill_type: '生活用品'})
 * this.app.mysql.select('billinfo', {
 * 	where: {bill_type: '生活用品'}
 * })
 * 添加数据
 * this.app.mysql.insert('billinfo', {
 * 	bill_price: '20',
		bill_type: '生活用品',
		bill_date: new Date()
 * })
 * 修改数据
 * this.app.mysql.update('billinfo', {bill_id: xxx, bill_price: xxx}) 主键修改
 * this.app.mysql.query('update user set bill_price = ? where bill_type = ?', [100, '生活用品'])
 * 删除
 * this.app.mysql.delete('billinfo', {bill_id: xx})
 * 执行 sql
 * this.app.mysql.query(sql, values)
 *
 */
