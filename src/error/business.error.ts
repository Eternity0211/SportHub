// src/error/business.error.ts
export class BusinessError extends Error {
    constructor(
      public message: string, 
      public code: number = 400, // 业务错误码，默认400
      public data?: any // 可选错误数据
    ) {
      super(message);
      this.name = 'BusinessError';
    }
  }