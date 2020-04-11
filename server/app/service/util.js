'use strict'
const uuidv1 = require('uuid').v1
// const uuidv3 = require('uuid').v3

const createUuid = () => {
	const uuidArray = uuidv1().split('-')
	const arr = [].concat(uuidArray.slice(0, 3).reverse(), uuidArray.slice(3))
	const uuid = arr.join('')
	return uuid
}
module.exports = createUuid
