import Todo from "../../db/models/TodoModel";

const generateTodoModel = () => ({
  queries: {
    getAll: () =>
      new Promise(
        async (resolve, reject) =>
          await Todo.find({}, (err, todo) =>
            err ? reject(err) : resolve(todo)
          )
      ),
  },
  mutations: {
    addTodo: (todo) =>
      new Promise((resolve, reject) =>
        new Todo(todo).save((err, todo) => (err ? reject(err) : resolve(todo)))
      ),
  },
});

export default generateTodoModel;
