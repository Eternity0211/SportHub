import { Controller, Get, Post, Inject, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ActivityService } from '../service/activity.service';
// import { AuthMiddleware } from '../middleware/auth.middleware';

@Controller('/api/activities')
// @Controller('/api/activities', {
//   middleware: [AuthMiddleware],
// })
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  @Get('/test')
  async testRoute() {
    return { message: '后端路由正常' };
  }

  @Get('/:id/enroll-status')
  async getEnrollStatus(
    @Param('id') activityId: number,
    ctx: Context 
  ) {
    const userId = ctx.state?.user?.id;
    return await this.activityService.getEnrollStatus(activityId, userId);
  }

  @Post('/:id/enroll')
  async enrollActivity(@Param('id') id: number) {
    return { success: true, message: '报名成功' };
  }

  @Get('/:id/comments')
  async getComments(
    @Param('id') activityId: number,
    ctx: Context 
  ) {
    try {
      const comments = await this.activityService.getComments(activityId);
      // 统一返回格式（与前端预期一致）
      return { 
        code: 200, 
        data: comments.map(comment => ({
          ...comment, 
          createdAt: comment.createdAt
        })) 
      };
    } catch (error) {
      ctx.status = 500;
      return { code: 500, message: error.message };
    }
  }
}