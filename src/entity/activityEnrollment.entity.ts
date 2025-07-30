// src/entity/activityEnrollment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { Activity } from './activity.entity';

@Entity('activity_enrollments') // 对应数据库表名
export class ActivityEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  activity_id: number;

  @Column({ type: 'int', nullable: false, comment: '报名用户ID' })
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolled_at: Date;

  // 关联活动表（多个报名记录对应一个活动）
  @ManyToOne(() => Activity, activity => activity.enrollments)
  activity: Activity;

  // 唯一索引：防止同一用户重复报名同一活动
  @Index('uk_user_activity', ['user_id', 'activity_id'], { unique: true })
  uniqueUserActivity: [number, number];
}