import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { MidwayError } from '@midwayjs/core';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  // 登录接口
  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;
    const result = await this.userService.login(username, password);
    if (result.success) {
      // 只有成功时才生成 Token
      const token = await this.jwtService.sign({ 
        userId: result.user.id,  // 此时 TypeScript 确定 result.user 存在
        username: result.user.username 
      });
      
      return {
        success: true,
        message: '登录成功',
        data: { token }
      };
    }
    return {
      success: false,
      message: result.message
    };
  }

@Post('/register')
async register(@Body() body) {
  console.log('注册请求参数:', body); // 打印请求体
  try {
    const { username, password } = body;
    if (!username || !password) {
      throw new MidwayError('用户名和密码不能为空');
    }
    const result = await this.userService.register(username, password);
    if (result.success) { // 注意：这里要和 UserService 返回格式对齐
      return { success: true, message: '注册成功，请登录' };
    }
    return { success: false, message: '注册失败，用户名已存在' };
  } catch (error) {
    // 强制输出错误（覆盖所有场景）
    console.error('注册接口崩溃:', error); 
    console.error('错误堆栈:', error.stack);
    return { code: 500, message: '服务器内部错误' };
  }
}
}
