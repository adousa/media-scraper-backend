import { EntityRepository, Repository } from 'typeorm';
import { UrlMedia } from '../Entities/url-media.entity';

@EntityRepository(UrlMedia)
export class UrlMediaRepository extends Repository<UrlMedia> {}
