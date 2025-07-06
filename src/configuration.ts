import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as swagger from '@midwayjs/swagger';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    swagger,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  swagger: {
    // 配置文档信息、UI 路径等
    document: {
      info: {
        title: '项目 API 文档',
        version: '1.0.0',
      },
    },
    ui: {
      // 指向 swagger-ui-dist 目录，需和安装的包对应
      distPath: join(__dirname, '../node_modules/swagger-ui-dist'),
    },
  },
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
