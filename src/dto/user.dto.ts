// src/dto/user.dto.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class RegisterDTO {
  @Rule(RuleType.string().required().min(3).max(20))
  username: string;

  @Rule(RuleType.string().required().min(6).max(30))
  password: string;

  @Rule(RuleType.string().required().email())
  email: string;
}

export class LoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}

export class UpdateUserDTO {
  @Rule(RuleType.string().min(3).max(20).optional())
  username?: string;

  @Rule(RuleType.string().min(6).max(30).optional())
  password?: string;

  @Rule(RuleType.string().email().optional())
  email?: string;

  @Rule(RuleType.string().optional())
  avatar?: string;

  @Rule(RuleType.string().optional())
  bio?: string;
}