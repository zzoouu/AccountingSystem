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
				console.log('post msg ok', res)
				return res.data
			} catch(e) {
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
				console.log(res.data)
				return res.data
			} catch(e) {}
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
			} catch(e) {}
		}
		@action
		login = async params => {
			try {
				const res = await post({
					url: Router.profileUrl.signin,
					body: params
				})
				console.log(res.data)
				return res.data
			} catch(e) {}
		}
}
const profileStore = new ProfileStore()
export default profileStore

