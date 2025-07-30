// src/utils/auth.ts
import { verify } from 'jsonwebtoken';
import { BusinessError } from '../error/business.error';

export function verifyToken(token: string) {
  try {
    // 替换为你的JWT密钥（建议从环境变量读取）
    return verify(token, 'your-secret-key') as { id: number };
  } catch (error) {
    throw new BusinessError('无效的token', 401);
  }
}