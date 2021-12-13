import { EntityRepository, Like } from 'typeorm';
import { UrlMedia } from '../Entities/url-media.entity';
import { CommonRepository } from './common.repository';

@EntityRepository(UrlMedia)
export class UrlMediaRepository extends CommonRepository<UrlMedia> {
  async search(search: string, page: number = 1, pageSize: number = 15) {
    const take = pageSize || 15;
    const skip = (page - 1) * take;
    const options = {
      take,
      skip,
    };

    if (search) {
      options['where'] = [
        { description: Like('%' + search + '%') },
        { src: Like('%' + search + '%') },
      ];
    }
    const [result, total] = await this.findAndCount(options);
    return CommonRepository.paginateResponse(result, total, page, pageSize);
  }
}
