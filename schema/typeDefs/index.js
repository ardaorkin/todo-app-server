import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Todo {
    _id: ID
    title: String
    mission: String
    createdAt: String
    updatedAt: String
    isDone: Boolean
    owner_id: ID
  }

  input TodoInput {
    title: String
    mission: String
    isDone: Boolean
    owner_id: ID!
  }

  type User {
    _id: ID
    username: String
    password: String
  }

  input UserInput {
    username: String
    password: String
  }

  type Query {
    getTodoList: [Todo]
    getUsers: [User]
    getUserNotes(owner_id: ID!): [Todo]
  }
  type Mutation {
    addTodo(todo: TodoInput): Todo
    modifyItem(id: ID!, query: TodoInput): Todo
    deleteItem(id: ID!): Todo
    addUser(user: UserInput): User
  }
`;

export default typeDefs;
