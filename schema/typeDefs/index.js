import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Todo {
    user: String
    title: String
    mission: String
    createdAt: String
    updatedAt: String
    isDone: Boolean
  }

  input TodoInput {
    user: String
    title: String
    mission: String
    isDone: Boolean
  }

  type Query {
    getTodoList: [Todo]
  }
  type Mutation {
    addTodo(todo: TodoInput): Todo
  }
`;

export default typeDefs;
