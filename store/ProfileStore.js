import { observable, action } from "mobx"

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
    postSuggest = suggest => {
			// 发送意见反馈
		}
}
const profileStore = new ProfileStore()
export default profileStore

