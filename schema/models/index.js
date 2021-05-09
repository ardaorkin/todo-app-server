import Todo from "../../db/models/TodoModel";
import User from "../../db/models/UserModel";

const generateTodoModel = (user) => ({
  queries: {
    getAll: () =>
      new Promise(
        async (resolve, reject) =>
          await Todo.find({}, (err, todo) =>
            err ? reject(err) : resolve(todo)
          )
      ),
    getUserNotes: () =>
      new Promise(
        async (resolve, reject) =>
          await Todo.find({ owner_id: user._id }, (err, notes) =>
            err ? reject(err) : resolve(notes)
          )
      ),
    getUsers: () =>
      new Promise(
        async (resolve, reject) =>
          await User.find({}, (err, users) =>
            err ? reject(err) : resolve(users)
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
    addUser: (user) =>
      new Promise((resolve, reject) =>
        new User(user).save((err, user) => (err ? reject(err) : resolve(user)))
      ),
  },
});

export default generateTodoModel;
