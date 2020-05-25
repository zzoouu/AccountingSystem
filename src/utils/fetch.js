export const request = (url, method, body, callBackSuccess, callBackError, headers = {}) => {
	return new Promise(async (resolve, reject) => {
		try {
			let config = {
				method,
				mode: 'cors'
			}
			let params
			if ((method === 'POST') || (method === 'PUT') || (method === 'DELETE')) {
				const newHeader = Object.assign({}, headers, {
					'Content-Type': 'application/json'
				})
				params = Object.assign({}, config, {
					body: JSON.stringify(body),
					// headers: {
					// 	'Content-Type': 'application/json'
					// }
					headers: newHeader
				})
			} else {
				params = config
			}
			const res = await fetch(url, params)
			resolve(res.json())
		} catch (e) {
			reject(e)
		}
	})

}

export const get = (params) => {
	const {
		url,
		callBackSuccess,
		callBackError
	} = params
	return request(url, 'GET', {}, callBackSuccess, callBackError)
}
export const del = (params) => {
	const {
		url,
		body,
		callBackSuccess,
		callBackError
	} = params
	return request(url, 'DELETE', body, callBackSuccess, callBackError)
}

export const post = (params) => {
	const {
		url,
		body,
		callBackSuccess,
		callBackError,
		headers
	} = params
	return request(url, 'POST', body, callBackSuccess, callBackError, headers)
}

export const put = (params) => {
	const {
		url,
		body,
		callBackSuccess,
		callBackError
	} = params
	return request(url, 'PUT', body, callBackSuccess, callBackError)
}
