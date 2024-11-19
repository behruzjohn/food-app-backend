export const paginationType = `
  totalDocs: Int
  limit: Int
  totalPages: Int
  page: Int
  pagingCounter: Int
  hasPrevPage: Boolean
  hasNextPage: Boolean
  prevPage: Int
  nextPage: Int
`;

export const paginationProps = 'page: Int, limit: Int';
