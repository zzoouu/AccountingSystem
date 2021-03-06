'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	// 正式 API
	// 注册
	router.post('/api/v1/signup', controller.user.signup)
	// 查找用户名是否存在
	router.post('/api/v1/signup/username', controller.user.findUsr)
	// 登录
	router.post('/api/v1/signin', controller.user.signin)
	// 登出
	router.get('/api/v1/signout', controller.user.signout)
	// 修改用户信息
	router.post('/api/v1/userinfo', controller.user.updateUserinfo)
	// 签到天数
	router.get('/api/v1/signdays', controller.user.getSignDays)
	router.post('/api/v1/signdays', controller.user.editSignDays)
	// 提交意见反馈
	router.post('/api/v1/message', controller.user.editMessage)
	// 获取账本大致信息
	router.get('/api/v1/bills', controller.bill.getBills)
	router.get('/api/v1/bills/:bill_id', controller.bill.getBillInfoById)
	// 获取所有账本记录
	router.get('/api/v1/bill/', controller.bill.getBillRecords)
	router.get('/api/v1/bill/:bill_id', controller.bill.getBillById)
	// 创建账本
	router.post('/api/v1/bills/createBill', controller.bill.createBill)
	// 编辑单个账本信息
	router.post('/api/v1/bill/editBill/:billId', controller.bill.editBillRecord)
	// 修改账本大致信息
	router.put('/api/v1/bill/editBill/:bill_id', controller.bill.changeBill)
	// 删除单笔记录
	router.delete('/api/v1/bill/:record_id', controller.bill.deleteRecord)
	// 删除账本
	router.delete('/api/v1/bills/:bill_id', controller.bill.deleteBill)
	// 总体预算
	router.post('/api/v1/budget/editBudget', controller.budget.editBudget)
	router.get('/api/v1/budget', controller.budget.getBudget)
	// 各项预算信息
	router.post('/api/v1/budget/budgetInfo', controller.budget.editBudgetInfo)
	router.get('/api/v1/budget/budgetInfo', controller.budget.getBudgetInfo)
}
