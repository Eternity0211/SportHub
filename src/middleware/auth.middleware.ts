// auth.middleware.ts
import { Middleware, IMiddleware, NextFunction, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      return next();
      // const whiteList = ['/user/register', '/user/login', '/', '/detail'];
      // if (whiteList.some(path => ctx.path.startsWith(path))) {
      //   return next();
      // }

      // const auth = ctx.get('Authorization');
      // if (!auth) {
      //   ctx.status = 401;
      //   return { code: 401, message: '未登录，请先登录' };
      // }

      // const token = auth.split(' ')[1];
      // if (!token) {
      //   ctx.status = 401;
      //   return { code: 401, message: '无效的认证信息' };
      // }

      // try {
      //   const user = await this.jwtService.verify(token);
      //   ctx.state.user = user; 
      //   return next();
      // } catch (error) {
      //   ctx.status = 401;
      //   return { code: 401, message: '认证失败，请重新登录' };
      // }
    };
  }

  static getName() {
    return 'auth';
  }
}