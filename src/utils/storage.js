import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const storage = new Storage({
	size: 1000, // max capacity 容量
	storageBackend: AsyncStorage, // data will not be lost after reload
	defaultExpires: 1000 * 3600 * 24 * 30, // default: 1 day, can be null: never expire
	enableCache: true,
	sync: {
		user(params) {
			let { userid, resolve, reject, syncParams: { extraFetchOptions, someFlag }} = params
			fetch('user/', {
				method: 'GET',
				body: 'id=' + id,
				...extraFetchOptions
			}).then(res => {
				return res.json()
			}).then(json => {
				if(json && json.user) {
					storage.save({
						key: 'user',
						id,
						data: json.user
					})
					if(someFlag) {
						// 
					}

				}else {
					reject && reject(new Error('data parse error'))
				}
			}).catch(e => {})
		}
	}
})

export const getStorage = (key, id) => {
	let ret
	storage.load({
		key,
		autoSync: true,
		syncInBackgroud: true,
		syncParams: {
			extraFetchOptions: {},
			someFlag: true
		},
	}).then(res => {
		ret = {
			code: 0,
			data: res
		}
	}).catch(e => {
		ret = {
			code: 1,
			data: e
		}
	})
	return ret
}

export const getUserinfo = async () => {
	try {
		const res = await storage.load({
			key: 'userinfo'
		})
		return res
	} catch(e) {
	}
}

// storage.remove({key: 'user'})

export default storage
