import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderName: string;

  @Column()
  price: number;

  @Column('simple-array')
  items: string[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;
}