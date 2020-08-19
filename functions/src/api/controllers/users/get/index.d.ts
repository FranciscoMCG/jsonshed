import { User } from '../index.d';

export interface PaginatedResults {
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  results: User;
}
