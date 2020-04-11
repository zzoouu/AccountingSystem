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
			color
		} = info
		const uuid = createUuid()
		const searchName = await this.app.mysql.get('bills', { bill_name })
		if (!searchName) {
			const res = await this.app.mysql.insert('bills', {
				bill_id: uuid,
				bill_name,
				isShared,
				color
			})
			if (res.affectedRows === 1) {
				return {
					msg: 'OK',
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
	async getBills() {
		const bills = await this.app.mysql.select('bills')
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
	async getBillById(bill_id) {
		console.log(bill_id)
		const billinfo = await this.app.mysql.select('bill', {
			where: { bill_id },
			orders: [['record_date', 'desc']]
		})
		return {
			msg: 'OK',
			data: billinfo
		}
	}
	async getBillRecords() {
		const records = await this.app.mysql.select('bill', {
			orders: [[ 'record_date', 'desc' ]]
		})
		return {
			msg: 'OK',
			data: records
		}
	}
	async deleteRecord(record_id) {
		const res = await this.app.mysql.delete('bill', {
			record_id
		})
		return record_id
	}
	async deleteBill(bill_id) {
		const res = await this.app.mysql.delete('bills', {
			bill_id
		})
		return bill_id
	}
	async changeBill(info) {
		const { bill_id, ...params } = info
		console.log('params', params)
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
