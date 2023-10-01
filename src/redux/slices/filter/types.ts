export type SortType = {
  name: string;
  sortProperty:
    | 'rating&order=desc'
    | 'rating&order=asc'
    | 'price&order=desc'
    | 'price&order=asc'
    | 'title&order=desc'
    | 'title&order=asc';
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

export type FilterType = {
  sort: SortType;
  currentPage: number;
  categoryId: number;
  sortProperty: string;
};
