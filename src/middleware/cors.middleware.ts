import { Middleware, IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class CorsMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 设置 CORS 响应头
      ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有域名
      ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      ctx.set('Access-Control-Allow-Credentials', 'true');

      // 处理 OPTIONS 请求（预检请求）
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204; // 无内容
        return;
      }

      // 继续处理其他请求
      return next();
    };
  }
}