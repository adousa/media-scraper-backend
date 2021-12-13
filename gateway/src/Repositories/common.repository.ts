import { Repository } from 'typeorm';

export class CommonRepository<T> extends Repository<T> {
  protected static paginateResponse(
    data: Array<any>,
    total: number,
    page: number,
    limit: number,
  ): PaginateResponse {
    const lastPage = Math.ceil(total / limit);
    const prevPage = page - 1 < 1 ? null : page - 1;
    const nextPage = page + 1 > lastPage ? null : page + 1;

    return {
      data,
      count: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }
}

export interface PaginateResponse {
  data: Array<any>;
  lastPage: number;
  nextPage: number;
  count: number;
  prevPage: number;
  currentPage: number;
}
