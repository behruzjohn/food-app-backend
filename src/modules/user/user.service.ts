import { User } from "./user.model";

export const getAllUsers = async () => {
  const foundUsers = await User.find();

  return { payload: foundUsers };
};
