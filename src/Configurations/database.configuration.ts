import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  name: process.env.DB_NAME || 'test',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  // autoLoadEntities: true,
  synchronize: process.env.APP_MODE === 'DEVELOPMENT',
}));
