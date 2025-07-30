// src/entity/activity.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ActivityEnrollment } from './activityEnrollment.entity';
import { Comment } from './comment.entity';

@Entity('activities') // 对应数据库表名
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: true, comment: '最大报名人数，NULL表示无限制' })
  max_people: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '活动状态' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // 关联报名表（一个活动对应多个报名记录）
  @OneToMany(() => ActivityEnrollment, enrollment => enrollment.activity)
  enrollments: ActivityEnrollment[];

  @OneToMany(() => Comment, (comment) => comment.activity)
  comments: Comment[];
}