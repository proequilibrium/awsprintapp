/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      owner
      date
      description
      format
      price
      completed
      invoiced
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        date
        description
        format
        price
        completed
        invoiced
      }
      nextToken
    }
  }
`;
export const searchTodos = /* GraphQL */ `
  query SearchTodos(
    $filter: SearchableTodoFilterInput
    $sort: SearchableTodoSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchTodos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        owner
        date
        description
        format
        price
        completed
        invoiced
      }
      nextToken
      total
    }
  }
`;
