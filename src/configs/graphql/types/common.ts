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

export const timestampsType = `
  createdAt: Date
  updatedAt: Date
`;

export const paginationProps = 'page: Int, limit: Int';
