import { Controller, Get, Query } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/home')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/view')
  async view(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/register')
  async register(
    @Query('username') username: string,
    @Query('password') password: string
  ): Promise<boolean> {
    console.log(username, password);

    return true;
  }
}
