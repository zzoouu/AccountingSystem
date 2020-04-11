/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
	const config = exports = {}

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1585297631627_9544';

	// add your middleware config here
	config.middleware = []

	config.security = {
		csrf: {
			enable: false,
			ignoreJSON: true
		},
		domainWhiteList: ['http://localhost:8081']
	}

	config.cors = {
		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
	}

	config.mysql = {
		client: {
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: 'password',
			database: 'account'
		},
		app: true,
		agent: false
	}

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	}

	return {
		...config,
		...userConfig
	}
};
