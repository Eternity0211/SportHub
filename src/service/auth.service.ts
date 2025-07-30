import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { LoginDTO } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Provide()
export class AuthService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async login(loginDTO: LoginDTO) {
    // 1. 查询用户
    const user = await this.userModel.findOne({
      where: { username: loginDTO.username },
    });

    // 2. 验证用户
    if (!user) {
      throw new Error('用户不存在');
    }

    // 3. 验证密码
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isMatch) {
      throw new Error('密码错误');
    }

    // 4. 生成 Token（示例，实际用 JWT）
    const token = this.generateToken(user.id);
    return { token, userInfo: { username: user.username } };
  }

  private generateToken(userId: number): string {
    return `token_${userId}_${Date.now()}`;
  }
}