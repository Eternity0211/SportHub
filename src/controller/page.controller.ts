import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class PageController {
  @Inject()
  ctx: Context;

  @Get('/login')
  async loginPage() {
    return this.ctx.render('login');
  }

  @Get('/register-page')
  async registerPage() {
    return this.ctx.render('register');
  }
}