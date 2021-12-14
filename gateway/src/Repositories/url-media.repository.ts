import { EntityRepository, Like } from 'typeorm';
import { UrlMedia } from '../Entities/url-media.entity';
import { CommonRepository } from './common.repository';

@EntityRepository(UrlMedia)
export class UrlMediaRepository extends CommonRepository<UrlMedia> {
  async search(
    search: string,
    mediaType: string,
    page: number = 1,
    pageSize: number = 15,
  ) {
    const query = this.createQueryBuilder();
    if (mediaType) {
      query.where('type = :type', { type: mediaType });
    }
    if (search) {
      query.where((q) => {
        q.where('description like :description', {
          description: `%${search}%`,
        }).orWhere('src like :description', {
          description: `%${search}%`,
        });
      });
    }
    const [result, total] = await query.getManyAndCount();
    return CommonRepository.paginateResponse(result, total, page, pageSize);
  }
}
