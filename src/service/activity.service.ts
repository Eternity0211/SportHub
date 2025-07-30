import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Activity } from '../entity/activity.entity';
import { ActivityEnrollment } from '../entity/activityEnrollment.entity';
import { User } from '../entity/user.entity';
import { Comment } from '../entity/comment.entity';
import { BusinessError } from '../error/business.error';

@Provide()
export class ActivityService {
  @InjectEntityModel(Activity)
  activityRepo: Repository<Activity>;

  @InjectEntityModel(Comment)
  commentRepo: Repository<Comment>; 

  @InjectEntityModel(ActivityEnrollment)
  enrollmentRepo: Repository<ActivityEnrollment>;

  @InjectEntityModel(User)
  userRepo: Repository<User>;

  @Inject()
  entityManager: EntityManager;

  async getComments(activityId: number) {
    // 1. 检查活动是否存在
    const activity = await this.activityRepo.findOne({ 
      where: { id: activityId },
      relations: ['comments', 'comments.user'],
    });
    if (!activity) {
      throw new Error(`活动 ${activityId} 不存在`);
    }

    // 2. 查询评论（关联用户等逻辑可扩展）
    return activity.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      username: comment.user.username,
    }));
  }


  async enroll(activityId: number, userId?: number) {
    return await this.entityManager.transaction(async (manager) => {
      const activityRepo = manager.getRepository(Activity);
      const enrollmentRepo = manager.getRepository(ActivityEnrollment);

      const activity = await activityRepo.findOne({ where: { id: activityId } });
      if (!activity) {
        throw new BusinessError('活动不存在', 404);
      }

      const existingEnrollment = await enrollmentRepo.findOne({
        where: { activity_id: activityId, user_id: userId }
      });
      if (existingEnrollment) {
        throw new BusinessError('您已报名该活动', 400);
      }

      if (activity.max_people !== null) {
        const currentCount = await enrollmentRepo.count({
          where: { activity_id: activityId }
        });
        if (currentCount >= activity.max_people) {
          throw new BusinessError('活动名额已满', 400);
        }
      }

      const enrollment = enrollmentRepo.create({
        activity_id: activityId,
        user_id: userId
      });
      return await enrollmentRepo.save(enrollment);
    });
  }

  async unenroll(activityId: number, userId: number) {
    return await this.entityManager.transaction(async (manager) => {
      const activityRepo = manager.getRepository(Activity);
      const enrollmentRepo = manager.getRepository(ActivityEnrollment);

      const activity = await activityRepo.findOne({ where: { id: activityId } });
      if (!activity) {
        throw new BusinessError('活动不存在', 404);
      }

      const enrollment = await enrollmentRepo.findOne({
        where: { activity_id: activityId, user_id: userId }
      });
      if (!enrollment) {
        throw new BusinessError('您未报名该活动', 400);
      }

      return await enrollmentRepo.remove(enrollment);
    });
  }

  async getEnrollStatus(activityId: number, userId?: number) {
    const activity = await this.activityRepo.findOne({ where: { id: activityId } });
    if (!activity) {
      throw new BusinessError('活动不存在', 404);
    }

    const enrolledCount = await this.enrollmentRepo.count({
      where: { activity_id: activityId }
    });

    const isEnrolled = userId ? !!(await this.enrollmentRepo.findOne({
      where: { activity_id: activityId, user_id: userId }
    })) : false;

    const isFull = activity.max_people !== null && enrolledCount >= activity.max_people;

    return {
      maxPeople: activity.max_people ?? 0, 
      enrolledCount,
      isEnrolled,
      isFull
    };
  }

  async getEnrollmentList(activityId: number, page: number = 1, pageSize: number = 10) {
    const [list, total] = await this.enrollmentRepo.findAndCount({
      where: { activity_id: activityId },
      relations: ['user'], 
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { enrolled_at: 'DESC' }
    });

    return {
      list,
      total,
      page,
      pageSize
    };
  }
}
