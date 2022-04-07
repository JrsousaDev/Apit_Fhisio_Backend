import { compare, hash } from "bcrypt";

export const checkPassword = async (user: any, password: any) => compare(password, user.password);

export const createPasswordHash = async (newPassword: any) => {
  return hash(newPassword, 10);
}
