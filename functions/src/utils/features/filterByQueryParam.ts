import { HTTP404Error } from '../../errors/httpErrors';
import { ParsedQueryParams } from '../../../declarations/standard';
import { Controller } from '../../../declarations/api';
import { pagination } from './pagination';

export const filterByQueryParam = (
  controller: Controller[],
  query: ParsedQueryParams,
) => {
  let results: any = [];
  const PAGE = 'page';
  const LIMIT = 'limit';
  const COMPLETED = 'completed';
  const ORDER_BY = 'orderBy';
  const SORT_BY = 'sortBy';
  const page = query[PAGE];
  const limit = query[LIMIT];
  const controllerKeys = Object.keys(controller[0]);
  const paginationKeys = [PAGE, LIMIT];
  const sortKeys = [ORDER_BY, SORT_BY];
  const keys = [...controllerKeys, ...paginationKeys, ...sortKeys];
  const queryKeys = Object.keys(query);
  const queryValues = Object.values(query);

  const hasEmptyValue = queryValues.some(key => key === '');

  const isExistingKey = queryKeys.every((key: string) => keys.includes(key));

  const isPaginationQuery = page && limit;

  if (!isExistingKey) {
    throw new HTTP404Error('There are no parameters matching that query');
  }

  if (hasEmptyValue) {
    throw new HTTP404Error('You must provide a value for your query');
  }

  if (
    (queryKeys.includes(PAGE) && !queryKeys.includes(LIMIT)) ||
    (queryKeys.includes(LIMIT) && !queryKeys.includes(PAGE))
  )
    throw new HTTP404Error(
      `You need to provide a 'page' and 'limit' parameters when using pagination`,
    );

  const filteredResults = controller.filter((c: Controller) => {
    if (
      queryKeys.includes(COMPLETED) &&
      !query[COMPLETED].match(/^(true|false)$/)
    ) {
      throw new HTTP404Error(
        `when querying by 'completed' you must set the value as 'true' or 'false'`,
      );
    }

    // TODO allow toLowerCase()
    return Object.entries(query).every(([k, v]) => {
      if (controllerKeys.includes(k)) {
        if (k === 'id' || k === 'userId') {
          return c[k] === v;
        } else {
          return c[k].toString().includes(v);
        }
      }
      return controller;
    });
  });

  results = filteredResults;

  if (isPaginationQuery) {
    results = pagination(filteredResults, page, limit);
  }

  return results;
};
