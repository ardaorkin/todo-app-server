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
    modifyItem: (body) =>
      new Promise(
        async (resolve, reject) =>
          await Todo.findByIdAndUpdate(body.id, body.query, (err, todo) =>
            err ? reject(err) : resolve(todo)
          )
      ),
    deleteItem: (id) =>
      new Promise(
        async (resolve, reject) =>
          await Todo.findByIdAndDelete(id, (err, todo) =>
            err ? reject(err) : resolve(todo)
          )
      ),
  },
});

export default generateTodoModel;
