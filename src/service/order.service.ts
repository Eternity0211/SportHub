import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entity';
import { CreateOrderDTO } from '../dto/greeting.dto';

@Provide()
export class OrderService {
  @InjectEntityModel(OrderEntity)
  orderModel: Repository<OrderEntity>;

  async createOrder(orderData: CreateOrderDTO) {
    const order = this.orderModel.create(orderData);
    return this.orderModel.save(order);
  }

  async getOrderList() {
    return this.orderModel.find();
  }
}