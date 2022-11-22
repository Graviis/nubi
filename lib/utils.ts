import bcrypt from "bcryptjs";

export async function checkPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
