import { Configuration, App } from '@midwayjs/core';
// import config from './config/config.default';
import * as koa from '@midwayjs/koa';
// import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import { CorsMiddleware } from './middleware/cors.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { join } from 'path';

@Configuration({
  imports: [koa,
    //  orm,
      jwt],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    // console.log('显式导入的 orm 配置:', config.orm);
    this.app.useMiddleware([CorsMiddleware, AuthMiddleware]);
    console.log('应用启动完成');
    const ormConfig = this.app.getConfig('orm');
    console.log('TypeORM 配置:', ormConfig);
  }
}