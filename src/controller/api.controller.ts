import { Inject, Controller, Get, Post, Query, Body } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ApiOperation } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';
import { RegisterDTO } from '../dto/user.dto';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Get('/get_user')
  async getUser(@Query('uid') uid: number) {
    try {
      const user = await this.userService.getUser(uid);
      if (!user) {
        return { success: false, message: '用户不存在', data: null };
      }
      return { success: true, message: 'OK', data: user };
    } catch (error) {
      this.ctx.logger.error('获取用户失败:', error);
      return { success: false, message: '获取用户失败', data: null };
    }
  }

  @Get('/hello')
  @ApiOperation({ summary: '示例接口', description: '返回问候' })
  async hello() {
    return { message: 'Hello from Midway!' };
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录', description: '验证用户名和密码' })
  async login(@Body() body: { username: string; password: string }) {
    try {
      console.log('进入登录接口，请求体:', body);
      const user = await this.userService.login(body.username, body.password);
      if (!user) {
        return { success: false, message: '用户名或密码错误' };
      }
      // 生成 JWT Token
      const token = await this.jwtService.sign(
        { userId: user.user }, 
        'your-secret-key',    // 这里的密钥要和配置文件中一致
        { expiresIn: '1d' }   // 有效期也要一致
      );
      // 登录成功，可以生成 token 并返回
      return { success: true, message: '登录成功', data: { user, token } };
    } catch (error) {
      this.ctx.logger.error('登录失败:', error);
      return { success: false, message: '登录失败，请稍后再试' };
    }
  }

  @Post('/register')
  @Validate()
  @ApiOperation({ summary: '用户注册', description: '创建新用户' })
  async register(@Body() body: RegisterDTO) {
    try {
      console.log('进入注册接口，请求体:', body);
      const result = await this.userService.register(body.username, body.password);
      console.log('注册结果:', result);
      return result;
    } catch (error) {
      this.ctx.logger.error('注册失败:', error);
      return { success: false, message: '注册失败，请稍后再试' };
    }
  }
}