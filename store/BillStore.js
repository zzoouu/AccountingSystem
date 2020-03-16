import { observable, action } from "mobx"

const getBillInfo = () => {
	return {
	}
}
class BillStore {
	@observable billInfo
	constructor() {
		this.profileInfo = getBillInfo()
	}
}
const billStore = new BillStore()
export default billStore

