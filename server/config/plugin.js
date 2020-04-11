'use strict'

/** @type Egg.EggPlugin */
module.exports = {
	// had enabled by egg
	// static: {
	// cors: {
	// 	enable: true,
	// 	package: 'egg-cors',
	// }
	mysql: {
		enable: true,
		package: 'egg-mysql'
	}
}
