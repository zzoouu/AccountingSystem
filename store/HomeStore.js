import { observable, action, computed } from 'mobx'
import { get, post } from '../src/utils/fetch'
import Router from '../router'
import storage, { getUserinfo } from '../src/utils/storage'

const url =  'http://localhost:7001/bill'
class HomeStore {
	@observable records = []
	@observable originRecords = []
	@observable userStatus = 0
	@observable statusText = undefined
	constructor() {
		this.records = this.getRecords()

	}

	@action
	getRecords = async () => {
		try {
			const res = await get({
				url: `${Router.billUrl.bill}`
			})
			// this.records = res.data.data
			const data = res.data.data
			this.originRecords = data
			this.records = formatBillRecords(data)
			
		} catch(e) {
			console.log('eee', e)
		}
	}
	@action
	getStatus = async () => {
		try {
			const res = await storage.load({key: 'userinfo'})
			this.userStatus = res ? 1 : 0
		} catch (e) {
			switch (e.name) {
				case 'NotFoundError':
					this.userStatus = 0
					this.statusText = '您还未登录，请点击前往登录~'
					break
				case 'ExpiredError':
					this.userStatus = 2
					this.statusText = '您的登录信息已经过期，请点击重新登录~'
					break
			}
			console.log('e', e)
		}
	}
}
const homeStore = new HomeStore()
export default homeStore

export const formatBillRecords = (records) => {
		let obj = {}
		let arr = []
		let data = []
		if (records.length) {
			// let flag = records[0].record_date.substr(0, 10)
			let flag = records[0].record_date.substr(0, 7)
			records.map((record, index) => {
				const date = record.record_date
				// let time = date.substr(0, 10) // 按日划分
				let time = date.substr(0, 7)
				data.push(record)
				if ((flag !== time) || (index === records.length - 1)) {
					obj.title = flag
					obj.data = data
					flag = time
					arr.push(obj)
					data = []
					obj = {}
				}
			})
		}
		return arr
}

