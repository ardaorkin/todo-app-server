import User from "../db/models/UserModel";

const validateUser = (user) =>
  new Promise(
    async (resolve, reject) =>
      await User.findOne({ ...user }, (err, user) =>
        err
          ? reject(err)
          : user === null
          ? reject(new Error("User not found"))
          : resolve(user)
      )
  );

export default validateUser;
