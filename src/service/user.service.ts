import { Provide, Init } from '@midwayjs/core';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Provide()
export class UserService {
  // 直接在这里初始化数据源和仓库（用可选链+断言让 TS 不报错）
  private dataSource: DataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '060211',
    database: 'sport_hub',
    synchronize: true,
    logging: true,
    entities: [User],
  });
  private userRepository!: Repository<User>; 

  // 服务启动时自动执行初始化
  @Init()
  async init() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log('✅ 数据源初始化成功');
    }
    this.userRepository = this.dataSource.getRepository(User);
    console.log('✅ userRepository 初始化成功');
  }

  // 根据用户ID获取用户
  async getUser(userId: number): Promise<User | null> {
    await this.ensureReady(); // 每次调用都确保初始化完成
    console.log('[UserService] getUser 方法被调用，userId:', userId);
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      console.log('[UserService] 查询用户完成，结果:', user ? '找到用户' : '用户不存在');
      return user;
    } catch (error) {
      console.error('[UserService] 获取用户失败:', error);
      throw error;
    }
  }

  // 登录验证
  async login(username: string, password: string) {
    if (!this.userRepository) {
      await this.init(); // 重新触发初始化
    }
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { 
      success: true, 
      user: { id: user.id, username: user.username } 
    };
    }
    return { success: false, message: '账号或密码错误' };
  }
  
  // 用户注册
  async register(username: string, password: string): Promise<{ success: boolean; message: string }> {
    await this.ensureReady(); 
    console.log('[UserService] register 方法被调用，username:', username);
    try {
      const existingUser = await this.userRepository.findOne({ where: { username } });
      if (existingUser) {
        console.log('[UserService] 用户名已存在，返回失败信息');
        return { success: false, message: '用户名已存在' };
      }
      const salt = await bcrypt.genSalt(10);
      const newUser = this.userRepository.create({
        username,
        password: await bcrypt.hash(password, salt),
      });
      await this.userRepository.save(newUser);
      console.log('[UserService] 用户保存成功，新用户ID:', newUser.id);
      return { success: true, message: '注册成功' };
    } catch (error) {
      console.error('[UserService] 注册过程中发生错误:', error);
      return { success: false, message: '注册失败' };
    }
  }

  // 核心：确保数据源和仓库一定可用
  private async ensureReady() {
    if (!this.userRepository) {
      await this.init(); // 直接调用初始化方法
    }
  }
}