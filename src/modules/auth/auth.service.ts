import { UserInputError } from 'apollo-server-core';
import { matchSha256Hash } from '../../utils/crypto';
import { LoginProps } from './props/logIn.props';
import { User } from '../user/user.model';
import { AuthOutput } from './outputs/auth.output';
import { createToken } from 'src/utils/jwt';
import { JWTAuthPayload } from 'src/types/auth';
import { RoleEnum } from 'src/enums/role.enum';

export const login = async ({ auth }: LoginProps): Promise<AuthOutput> => {
  const isHashMatch = matchSha256Hash(
    auth as any,
    <string>process.env.TELEGRAM_BOT_TOKEN,
  );

  if (!isHashMatch) {
    throw new UserInputError('Hash is not matching');
  }

  let user = await User.findOne({ telegramId: auth.id });

  if (!user) {
    user = await User.create({
      telegramId: auth.id,
      name: auth.first_name,
      role: RoleEnum.user,
    });
  }

  const jwtPayload: JWTAuthPayload = {
    _id: user._id,
    telegramId: user.telegramId,
    role: <RoleEnum>user.role,
  };

  const token = createToken(jwtPayload, { expiresIn: '7d' });

  return { user, token };
};
