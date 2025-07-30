import { Controller, Get, Post } from '@midwayjs/core';

@Controller('/api/user')
export class UserController {
  @Get('/profile')
  async getProfile() {
    // 后端获取用户资料逻辑
  }

  @Post('/settings')
  async updateSettings() {
    // 后端更新设置逻辑
  }
}