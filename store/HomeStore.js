import { observable, action, computed } from 'mobx'
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

class HomeStore {
	@observable list
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
	// @action
	// plus = () => {
	// 	this.num += 1
	// }
}
const homeStore = new HomeStore()
export default homeStore

