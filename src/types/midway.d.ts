import { InjectionConfigurationOptions } from '@midwayjs/core';
import { SwaggerConfiguration } from '@midwayjs/swagger';

// 扩展 InjectionConfigurationOptions 类型，加入 swagger 配置
declare module '@midwayjs/core' {
  interface InjectionConfigurationOptions {
    swagger?: SwaggerConfiguration;
  }
}
