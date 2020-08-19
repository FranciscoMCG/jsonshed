export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  jobTitle: string;
}

export interface Todo {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export type Controller = Todo | User | Post;

export interface PaginatedResults {
  page: number;
  limit: number;
  totalPages: number;
  results?: Controller[];
}
