const resolvers = {
  Query: {
    getTodoList: async (parent, args, context) =>
      await context.models.Todo.queries.getAll(),
    getUsers: async (parent, args, context) =>
      await context.models.Todo.queries.getUsers(),
    getUserNotes: async (parent, args, context) =>
      await context.models.Todo.queries.getUserNotes(),
  },
  Mutation: {
    addTodo: async (parent, args, context) =>
      await context.models.Todo.mutations.addTodo(
        JSON.parse(JSON.stringify(args.todo))
      ),
    modifyItem: async (parent, args, context) =>
      await context.models.Todo.mutations.modifyItem(
        JSON.parse(JSON.stringify(args))
      ),
    deleteItem: async (parent, args, context) =>
      await context.models.Todo.mutations.deleteItem(
        JSON.parse(JSON.stringify(args.id))
      ),
    addUser: async (parent, args, context) =>
      await context.models.Todo.mutations.addUser(
        JSON.parse(JSON.stringify(args.user))
      ),
  },
};

export default resolvers;
