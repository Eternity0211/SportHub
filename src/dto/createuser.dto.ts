// src/dto/createuser.dto.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class CreateUserDTO {
  @Rule(RuleType.string().required().min(3).max(20))
  username: string;

  @Rule(RuleType.string().required().min(6).max(32)) // 新增密码长度校验
  password: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().email().required()) // 新增邮箱格式校验
  email: string;

  @Rule(RuleType.string().optional()) // 手机号可选
  phone: string;
}