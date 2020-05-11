export const request = (url, method, body, callBackSuccess, callBackError) => {
	return new Promise(async (resolve, reject) => {
		try {
			let config = {
				method,
				mode: 'cors'
			}
			let params
			if ((method === 'POST') || (method === 'PUT') || (method === 'DELETE')) {
				params = Object.assign({}, config, {
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json'
					}
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
		callBackError
	} = params
	return request(url, 'POST', body, callBackSuccess, callBackError)
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
