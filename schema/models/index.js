import Todo from "../../db/models/TodoModel";
import User from "../../db/models/UserModel";

const generateTodoModel = ({ user }) => ({
  queries: {
    getAll: () =>
      user.role === "admin"
        ? new Promise(
            async (resolve, reject) =>
              await Todo.find({}, (err, todo) =>
                err ? reject(err) : resolve(todo)
              )
          )
        : null,
    getUserNotes: () =>
      !user
        ? null
        : new Promise(
            async (resolve, reject) =>
              await Todo.find({ owner_id: user._id }, (err, notes) =>
                err ? reject(err) : resolve(notes)
              )
          ),
    getUsers: () =>
      user.role === "admin"
        ? new Promise(
            async (resolve, reject) =>
              await User.find({}, (err, users) =>
                err ? reject(err) : resolve(users)
              )
          )
        : null,
  },
  mutations: {
    addTodo: (todo) =>
      !user
        ? null
        : new Promise((resolve, reject) =>
            new Todo(
              Object.assign({}, { ...todo }, { owner_id: user._id })
            ).save((err, todo) => (err ? reject(err) : resolve(todo)))
          ),
    modifyItem: (body) =>
      new Promise(async (resolve, reject) =>
        user.role === "admin"
          ? await Todo.findByIdAndUpdate(body.id, body.query, (err, todo) =>
              err ? reject(err) : resolve(todo)
            )
          : await Todo.findById(body.id, async (err, todo) =>
              err
                ? reject(err)
                : user._id.toString() === todo.owner_id.toString()
                ? await Todo.findByIdAndUpdate(
                    body.id,
                    body.query,
                    (err, todo) => (err ? reject(err) : resolve(todo))
                  )
                : reject(new Error("Unauthorized"))
            )
      ),
    deleteItem: (id) =>
      new Promise(async (resolve, reject) =>
        user.role === "admin"
          ? await Todo.findByIdAndDelete(id, (err, todo) =>
              err ? reject(err) : resolve(todo)
            )
          : await Todo.findById(id, async (err, todo) =>
              err
                ? reject(err)
                : user._id.toString() === todo.owner_id.toString()
                ? await Todo.findByIdAndDelete(id, (err, todo) =>
                    err ? reject(err) : resolve(todo)
                  )
                : reject(new Error("Unauthorized"))
            )
      ),
    addUser: (user) =>
      new Promise((resolve, reject) =>
        new User(user).save((err, user) => (err ? reject(err) : resolve(user)))
      ),
  },
});

export default generateTodoModel;
