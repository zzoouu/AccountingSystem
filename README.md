# AccountingSystem
an accounting system


### 需求分析
#### 注册登录
* 注册成为新的用户
* 登录进入系统（token?)
* 退出功能
* 登录后个人信息: 签到天数，用户名，头像，？各平台授权登录后的 ID？

### 数据分析设计
#### 用户信息 | userinfo
* user_name: String 用户名 varchar(50)
* avatar: String 头像 
* sign_days: Number 签到天数  TINYINT(50)
* id?: String 用户 ID，身份证明 varchar(50)

#### 用户反馈信息 | messages
* id?
* message: String 反馈信息 varchar(100)
* date: String  反馈信息提交的事件 datetime
* message_id: String 反馈 ID varchar(50)

#### 所有账本信息 | bills
* bill_id: 账本ID varchar(50)
* bill_name: 账本名字 varcahr(50)
* isShared: 是否共享 char(1) 0: 不是共享账单  1: 是共享账单
* members: 账本成员  varcahr(100)
* color: 账本封面颜色  varchar(20)

#### 单个账本 | bill
* bill_id: 账本 ID  varcahr(50)
* record_id: 单笔记录 id   varchar(50)
* date: 记账事件     datetime
* shop_name: 收入支出名字  varchar(20)  ?汉字 or label
* money: 收入或支出的金额   double
* author: 记录人物   varchar(50)
* desc: 描述    varchar(50)
* record_type: 0 支出 1 收入 int
* icon: varchar(20) | icon name

#### 预算 | budget
* budget_type: 预算单位 char(1) 0:year, 1:month, 2:day
* isBudget: 是否开启预算 char(1) 0: 不开启 1:开启预算,默认开启预算
* total_budget: 预算总金额 int

#### 各项预算 | budgets
* type: 预算单位 char(1)  
* budget_id: 预算 ID varcahr(50)
* budget_name: 预算分类名称 varchar(20)
* budget: 预算金额 int

### api
> params: 传入数据; code: 响应结果; data:响应成功返回的数据; msg:响应结果信息说明

#### 注册接口
```
api: post /api/v1/signup

params: {
  ?id: string  // 用户 ID
	avatar: string  // 用户头像
	userName: string  // 用户名
}

code: 1 注册成功  0 信息有误或信息不完善  -1 注册失败，该用户已经存在

data: {
	_id: _id,
	token: 生成的 token,
	userName: 用户名
}
```

#### 登录接口
```
api: post /api/v1/signin

params: {
	_id,
	userName,
}

data: {
	_id,
	userName,
	lastLoginTime,
}
```

#### 退出接口
```
api: get /api/v1/signout
code: 1 登出成功，前端退出系统并情况 token
data: {}
```

#### 提交意见反馈
```
api: post /api/v1/editMessage
params: {
	_id,
	message,
}
code: 1 提交成功  0 请先登录再提交反馈 
data: {
	_id,
	msg_id: 反馈 ID
}
```
#### 签到
```
api: post /api/v1/editSignDays
params: {
	_id,
	day,
}
code: 1 签到成功
data: {}
```
#### 获取所有账本大概信息
```
api: get /api/v1/bill/bills
data: {
	bill_name,
	isShared,
	members,
	color,
	bill_id
}
```

#### 通过账本 ID获取单个账本信息
```
api: get /api/v1/bill/bills/:id
data: {
	bill_id,
	date,
	shop_name,
	money,
	author,
	record_id
}
```

#### 创建账本
```
api: post /api/v1/bill/createBill
params: {
	billName,
	isShared,
	members,
	color
}
code: 1 创建成功  0 请先登录
data: {
	billId
}
```
#### 更改账本设置信息
```
api: put /api/v1/bill/editBill/:billId

params: {
	// 更改的信息
	bill_name,
	isShared,
	members,
	color
}
code: 1 更改成功  0 请先登录
data: {
	billId
}
```

#### 删除账本
```
api delete /api/v1/bill/:billId
code: 1 删除成功  0 请先登录
data: {}
```

#### 删除单笔记录
```
api delete /api/v1/bill/:record_id
code: 1 删除成功  0 请先登录
data: {}
```

#### 编辑单个账本信息
```
api: post /api/v1/bill/editBill/:billId
params: {
	billId,
	shop_name,
	money,
	desc,
	author
}
code: 1 添加成功  0 请先登录
data: {
	billId
}
```
#### 设置总体预算信息
```
api post /api/v1/budget/editBudget
params: {
	type: 0 year 1 month 2 day
	isBudget,
	total_budget
}
```
#### 获取总体预算信息
```
api get /api/v1/budget
data: {
	type,
	isBudget,
	total_budget
}
```

#### 设置各项预算信息
```
api post /api/v1/budget/budgetInfo
params: {
	type,
	budget_name,
	budget,
}
data: {
	budgetId
}
```
#### 获取所有预算信息
```
api get /api/v1/budget/budgetInfo
data: {
	type,
	budget_name,
	budget,
	budgetId
}
```

#### 更改总体预算信息

#### 更改各项预算信息

扫描二维码添加成功后，点击账本无法查看细节，需要传 choseType 参数

需要添加账本主授权人



签到处理
推荐给朋友

设置中添加改变用户名，  改变密码(可能需要短信验证)   时间提醒 权衡是否存在

首页头部总记没有区分状态


收入
工资、红包、理财、外快、生活费、报销、绩效奖金、投资
公积金、退款、奖学金、退税

消费

化妆品、护肤品、租房、红包、交通、水、电、快递、社交、通讯、餐饮、学习、衣物鞋包、数码、医疗、娱乐、维修、日用品、
长辈、孩子、旅行、宠物、礼金、烟酒、还贷、健身、


### react-native-vector-icons multiple commands produce:
- react-native link react-native-vector-icons->info.plist自动填充，;build phases中 copy pods resources 中删除对 ttf 的引入;copy bundle resources 自动引入
- 自定义，iconfont.svg 和 iconfont_mapper.sh 同级，执行./iconfont_mapper.sh iconfont.svg生成 iconfont.json，若报错，先执行chmod 777 iconfont_mapper.sh
- iconfont.json 加入到 component/icon
- 同级添加 iconfont.js
- 引入使用，相对目录 component/icon/iconfont.js


<!-- - 记账后，报表未更新数据 ?? 应该解决了 -->
<!-- - 管理图标  如何永久保存 删减一更新回到原点 数据库 ？？？  去掉 -->
<!-- - 签到处理 bug 同一天的签到取消 -->
<!-- - 时间选择处理 首页刷新和筛选矛盾 -->
<!-- - 推荐给朋友 -->
- 提醒设置
- 输入框中文处理
<!-- - 退出登录之后，收支栏为空, 账本栏为空，无账本, 再次登录另一个账号，预算界面数据有遗留 -->

<!-- - 预算设置为月预算后，消费没有不是月消费 ?? 缺乏数据，貌似可行 -->







