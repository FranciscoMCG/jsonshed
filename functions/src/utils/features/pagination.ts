import { ParsedQueryParams } from '../../../declarations/standard.d';
import { Controller, PaginatedResults } from '../../../declarations/api.d';

export const isPaginationQuery = (queryParamsKeys: string) =>
  queryParamsKeys?.includes('page');

export const pagination = (
  data: Controller[],
  page: ParsedQueryParams,
  limit: ParsedQueryParams,
) => {
  const pageInt = Number(page);
  const limitInt = Number(limit);
  const totalPages = Math.ceil(data.length / limitInt);

  const startIndex: number = (pageInt - 1) * limitInt;
  const endIndex: number = pageInt * limitInt;

  let results: PaginatedResults = { page: 1, limit: 1, totalPages: 1 };

  if (pageInt && limitInt) {
    if (endIndex < data.length) {
      results = {
        page: pageInt,
        limit: limitInt,
        totalPages,
      };
    }
    if (results) results.results = data.slice(startIndex, endIndex);
  }
  return results;
};
