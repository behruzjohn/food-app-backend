import { UserInputError } from "apollo-server-core";
import { matchSha256Hash } from "../../utils/crypto";
import { LogInProps } from "./props/logIn.props";
import { User } from "../user/user.model";

export const logIn = async ({ auth }: LogInProps) => {
  const isHashMatch = matchSha256Hash(
    auth,
    <string>process.env.TELEGRAM_BOT_TOKEN
  );

  if (!isHashMatch) {
    throw new UserInputError("Hash is not matching");
  }

  const foundUser = await User.findOne({ telegramId: auth.id });

  if (!foundUser) {
    await User.create({
      telegramId: auth.id,
      name: auth.first_name,
    });
  }
};
