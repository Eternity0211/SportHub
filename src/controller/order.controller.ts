import { Controller, Get, Post, Body, Inject } from '@midwayjs/core';
import { OrderService } from '../service/order.service';
import { CreateOrderDTO } from '../dto/greeting.dto'; // 可根据实际 DTO 调整，也可直接用接口

@Controller('/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Post('/create')
  async createOrder(@Body() orderData: CreateOrderDTO) {
    return this.orderService.createOrder(orderData);
  }

  @Get('/list')
  async getOrderList() {
    return this.orderService.getOrderList();
  }
}