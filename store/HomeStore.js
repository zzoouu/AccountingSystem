import { observable, action, computed } from 'mobx'
import { get, post } from '../src/utils/fetch'
import Router from '../router'

const getItemList = () => {
	return [
		{
			title: new Date(),
			data: [
				{
					type: 'income',
					money: 2000,
					label: '购物'
				},
				{
					type: 'pay',
					money: 2000,
					label: '衣服'
				},
				{
					type: 'income',
					money: 400,
					label: '生活用品'
				}
			]
		},
		{
			title: new Date(1999, 6, 3),
			data: [
				{
					type: 'income',
					money: 200,
					label: '购物'
				},
				{
					type: 'pay',
					money: 700,
					label: '衣服'
				},
				{
					type: 'income',
					money: 400,
					label: '生活用品'
				}
			]
		},
		{
			title: new Date(),
			data: [
				{
					type: 'income',
					money: 2000,
					label: '购物'
				},
				{
					type: 'pay',
					money: 2000,
					label: '衣服'
				},
				{
					type: 'income',
					money: 400,
					label: '生活用品'
				}
			]
		},
		{
			title: new Date(1998, 9, 4),
			data: [
				{
					type: 'income',
					money: 2000,
					label: '购物'
				},
				{
					type: 'pay',
					money: 2000,
					label: '衣服'
				},
				{
					type: 'income',
					money: 400,
					label: '生活用品'
				}
			]
		},
		{
			title: new Date(2024, 5, 8),
			data: [
				{
					type: 'income',
					money: 2000,
					label: '购物'
				},
				{
					type: 'pay',
					money: 2000,
					label: '衣服'
				},
				{
					type: 'income',
					money: 400,
					label: '生活用品'
				}
			]
		}
	]
}
const url =  'http://localhost:7001/bill'
class HomeStore {
	@observable list
	@observable records = []
	@computed get itemList() {
		return this.list.map(v => {
			return {
				title: v.title,
				data: v.data.slice()
			}
		}).slice()
	}
	constructor() {
		this.list = getItemList()
	}
	@action
	getUserinfoById = (userid) => {
		// fetch
		// this.list = res
	}

	@action
	getTestBill = async (callBackSuccess, callBackError) => {
		const res = await get(url, callBackSuccess, callBackError)
		return res
	}
	@action
	editBillInfo = async (callBackSuccess, callBackError) => {
		try {
			let params = {
				price: 128,
				label: '测试post'
			}
			let url = 'http://localhost:7001/bill/editBill'
			const res = await post(url, params)
			return res
		}catch(e) {
			console.log('e', e)
			return e
		}
	}
	@action
	getRecords = async () => {
		try {
			const res = await get({
				url: `${Router.billUrl.bill}`
			})
			this.records = res.data.data
		} catch(e) {
		}
	}
}
const homeStore = new HomeStore()
export default homeStore

