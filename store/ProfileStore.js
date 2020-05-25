import { observable, action } from "mobx"
import { get, post } from '../src/utils/fetch'
import Router from '../router'

const getProfileInfo = () => {
	return {
	}
}
class ProfileStore {
	@observable profileInfo
	constructor() {
		this.profileInfo = getProfileInfo()
	}
	@action
	postMessage = async suggest => {
		// 发送意见反馈
		try {
			const res = await post({
				url: Router.profileUrl.message,
				body: suggest
			})
			return res.data
		} catch (e) {
			console.log('e', e)
			return e
		}
	}

	@action
	regist = async info => {
		try {
			console.log(info)
			const res = await post({
				url: Router.profileUrl.signup,
				body: info
			})
			console.log('regist', res.data)
			return res.data
		} catch (e) { }
	}

	@action
	findUsr = async username => {
		try {
			const res = await post({
				url: Router.profileUrl.findUsr,
				body: username
			})
			console.log('find', res.data)
			return res.data
		} catch (e) { }
	}
	@action
	login = async params => {
		try {
			console.log(params)
			const res = await post({
				url: Router.profileUrl.signin,
				body: params
			})
			console.log("res", res)
			if (res.data.code === 1) {
				
			}
			return res.data
		} catch (e) {
			console.log('login', e)
		}
	}
	@action
	signout = async () => {
		try {
			const res = await get({
				url: Router.profileUrl.signout
			})
		} catch(e) {
		}
	}
	@action
	updateUserinfo = async (info) => {
		try {
			const res = await post({
				url: Router.profileUrl.updateUsr,
				body: info
			})
			return res.data
		} catch(e) {}
	}
	@action
	getSignDays = async () => {
		try {
			const res = await get({
				url: Router.profileUrl.editSignDays
			})
			console.log('get', res.data)
			return res.data
		} catch(e) {
			console.log('e', e)
		}
	}
	@action
	editSignDays = async (info) => {
		try {
			const res = await post({
				url: Router.profileUrl.editSignDays,
				body: info
			})
			console.log(res.data)
			return res.data
		} catch(e) {
			console.log('e', e)
		}
	}
}
const profileStore = new ProfileStore()
export default profileStore

