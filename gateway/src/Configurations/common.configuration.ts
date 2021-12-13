import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  typesToScrap: ['img', 'video'],
}));
