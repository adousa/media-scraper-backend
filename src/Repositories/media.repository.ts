import { EntityRepository, Repository } from 'typeorm';
import { Media } from '../Entities/media.entity';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {}
