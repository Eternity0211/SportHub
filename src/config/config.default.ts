// import { join } from 'path';

export default {
  keys: 'your-secret-key',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'your-secret-key',
    expiresIn: '1d',
  },
  // orm: {
  //   dataSource: {
  //     default: {
  //       type: 'mysql',
  //       host: 'localhost',
  //       port: 3306,
  //       username: 'root',
  //       password: '060211',
  //       database: 'sport_hub',
  //       synchronize: true,
  //       logging: true,
  //       entities: [join(__dirname, '../entity/*.entity{.ts,.js}')],
  //     },
  //   },
  // },
};