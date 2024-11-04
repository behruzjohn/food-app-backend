import { ApolloError } from 'apollo-server-core';
import { GraphQLErrorCode } from '../../enums/graphQLErrorCode.enum';

export class GraphQLError extends ApolloError {
  constructor(cause: string, code: keyof typeof GraphQLErrorCode) {
    super(cause, code);
  }
}

export class GraphQLParseFailedError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.GRAPHQL_PARSE_FAILED);
  }
}

export class GraphQLValidationFailedError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.GRAPHQL_VALIDATION_FAILED);
  }
}

export class BadUserInputError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.BAD_USER_INPUT);
  }
}

export class PersistedQueryNotFoundError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.PERSISTED_QUERY_NOT_FOUND);
  }
}

export class PersistedQueryNotSupportedError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.PERSISTED_QUERY_NOT_SUPPORTED);
  }
}

export class OperationResolutionFailureError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.OPERATION_RESOLUTION_FAILURE);
  }
}

export class BadRequestError extends GraphQLError {
  constructor(cause: string) {
    super(cause, GraphQLErrorCode.BAD_REQUEST);
  }
}

export class InternalServerError extends GraphQLError {
  constructor(cause: string = 'Internal server error') {
    super(cause, GraphQLErrorCode.INTERNAL_SERVER_ERROR);
  }
}
