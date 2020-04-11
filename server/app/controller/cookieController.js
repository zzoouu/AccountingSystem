'use strict'

const Controller = require('egg').Controller

class CookieController extends Controller {
  async add() {
    const ctx = this.ctx
    let user = ctx.cookies.get('user')
    if (!user) {
      let user = 222
      ctx.cookies.set('user', user, {
        httpOnly: true,
        encrypt: true, // 加密传输
        // maxAge: 
      })
    }
    console.log('cookie', user)
    ctx.body = 'extends'
  }

  async remove() {
    const ctx = this.ctx
    const user = ctx.cookies.set('user', null)
    ctx.status = 204
  }
}
module.exports = CookieController
