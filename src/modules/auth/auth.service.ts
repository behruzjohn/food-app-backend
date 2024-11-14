import { UserInputError } from 'apollo-server-core';
import { matchSha256Hash } from '../../utils/crypto';
import { TelegramLoginProps } from './props/telegramLogin.props';
import { User } from '../user/user.model';
import { AuthOutput } from './outputs/auth.output';
import { createToken } from 'src/utils/jwt';
import { JWTAuthPayload } from 'src/types/auth';
import { RoleEnum } from 'src/enums/role.enum';
import { CourierLoginProps } from './props/courierLogin.props';
import { Courier } from '../courier/courier.model';
import bcrypt from 'bcrypt';

export const telegramUserLogin = async ({
  auth,
}: TelegramLoginProps): Promise<AuthOutput> => {
  const isHashMatch = matchSha256Hash(
    auth as { hash: string },
    <string>process.env.TELEGRAM_BOT_TOKEN,
  );

  if (!isHashMatch) {
    throw new UserInputError('Hash is not matching');
  }

  let user = await User.findOne({ telegramId: auth.id });

  if (!user) {
    user = await User.create({
      name: auth.first_name,
      photo: auth.photo_url,
    });
  }

  const jwtPayload: JWTAuthPayload = {
    _id: user._id,
    role: RoleEnum['user'],
  };

  const token = createToken(jwtPayload, { expiresIn: '7d' });

  return { user, token };
};

export const signInAsCourier = async ({ data }: CourierLoginProps) => {
  const foundCourier = await Courier.findOne({ phone: data.phone });

  if (!foundCourier) {
    throw new UserInputError('Phone or password not correct');
  }

  const isPasswordCorrect = bcrypt.compare(
    foundCourier.password.toString(),
    data.password,
  );

  if (!isPasswordCorrect) {
    throw new UserInputError('Phone or password not correct');
  }

  const token = createToken(
    { courierId: foundCourier._id },
    { expiresIn: '7d' },
  );

  return { token };
};
