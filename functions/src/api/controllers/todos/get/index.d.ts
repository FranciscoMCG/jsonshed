import { Todo } from '../../../../../declarations/api';

export interface PaginatedResults {
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  results: Todo;
}
