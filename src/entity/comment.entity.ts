// src/entity/comment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Activity } from './activity.entity';
import { User } from './user.entity';

@Entity('activity_comments') // 数据库表名
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' }) // 评论内容
  content: string;

  @CreateDateColumn({ type: 'timestamp' }) // 创建时间
  createdAt: Date;

  @ManyToOne(() => Activity, (activity) => activity.comments)
  activity: Activity;

  @Column({ name: 'activity_id' }) // 外键：关联活动ID
  activityId: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column({ name: 'user_id' }) // 外键：关联用户ID
  userId: number;
}