import { filterByQueryParam } from '../filterByQueryParam';
import { mockData } from '../../../testUtils/__mocks__/mockData';

describe('filterByQueryParam', () => {
  it('throws an error when a parameter doesn not match the existing ones', () => {
    const testFunc = () => {
      filterByQueryParam(mockData, { job: 'actor' });
    };
    expect(testFunc).toThrowError(
      /There are no parameters matching that query/i,
    );
  });

  it('throws an error when a parameter doesn not have a value', () => {
    const testFunc = () => {
      filterByQueryParam(mockData, { title: '' });
    };
    expect(testFunc).toThrowError(/You must provide a value for your query/i);
  });

  it('throws an error when a pagination query does not contain page', () => {
    const testFunc = () => {
      filterByQueryParam(mockData, { limit: '1' });
    };
    expect(testFunc).toThrowError(
      /You need to provide a 'page' and 'limit' parameters when using pagination/i,
    );
  });

  it('throws an error when a pagination query does not contain limit', () => {
    const testFunc = () => {
      filterByQueryParam(mockData, { page: '2' });
    };
    expect(testFunc).toThrowError(
      /You need to provide a 'page' and 'limit' parameters when using pagination/i,
    );
  });

  it(`throws an error when a query by 'completed' is not true or false`, () => {
    const testFunc = () => {
      filterByQueryParam(mockData, { completed: 't' });
    };
    expect(testFunc).toThrowError(
      /when querying by 'completed' you must set the value as 'true' or 'false'/i,
    );
  });

  it('returns the exact item when filtered by id', () => {
    expect(filterByQueryParam(mockData, { id: '1' })).toEqual([
      {
        userId: '1',
        id: '1',
        title: 'Score a goal',
        completed: true,
      },
    ]);
  });

  it('returns the exact item when filtered by userId', () => {
    expect(filterByQueryParam(mockData, { userId: '3' })).toEqual([
      {
        userId: '3',
        id: '13',
        title: 'Ironing',
        completed: true,
      },
    ]);
  });

  it('returns the partial result when filtered by title', () => {
    expect(filterByQueryParam(mockData, { title: 'Iron' })).toEqual([
      {
        userId: '3',
        id: '13',
        title: 'Ironing',
        completed: true,
      },
    ]);
  });

  it('returns a paginated result', () => {
    expect(
      filterByQueryParam(mockData, {
        completed: 'true',
        page: '1',
        limit: '1',
      }),
    ).toEqual({
      limit: 1,
      page: 1,
      results: [
        { completed: true, id: '1', title: 'Score a goal', userId: '1' },
      ],
      totalPages: 2,
    });
  });
});
