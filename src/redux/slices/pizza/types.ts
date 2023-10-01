import { SortType } from '../filter/types';

export type FetchPizzasArgs = {
  categoryId: number;
  searchValue: string;
  sort: SortType;
  currentPage: number;
};

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
