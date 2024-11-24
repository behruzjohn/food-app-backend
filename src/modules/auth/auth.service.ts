import { UserInputError } from 'apollo-server-core';
import { BadRequestError } from 'src/common';
import {
  AUTH_TOKEN_EXPIRATION,
  PASSWORD_MIN_LENGTH,
  PHONE_CONFIRMATION_CODE_LENGTH,
  PHONE_CONFIRMATION_TOKEN_EXPIRATION,
} from 'src/constants/auth';
import { RoleEnum } from 'src/enums/role.enum';
import { sendSms } from 'src/sms';
import { JWTAuthPayload } from 'src/types/auth';
import { compareBcryptHash } from 'src/utils/bcrypt';
import { createToken, decodeToken } from 'src/utils/jwt';
import { generateRandomNumbers, matchSha256Hash } from '../../utils/crypto';
import { User } from '../user/user.model';
import { AuthOutput } from './outputs/auth.output';
import { SignUpOutput } from './outputs/signUp.output';
import { ConfirmSignUpProps } from './props/confirmSignUp.props';
import { SignInProps } from './props/signIn.props';
import { SignUpProps } from './props/signUp.props';
import { TelegramLoginProps } from './props/telegramLogin.props';
import { ConfirmPhoneTokenPayload } from './types/confirmPhoneTokenPayload';

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
      role: RoleEnum.user,
      telegramId: auth.id,
    });
  }

  const jwtPayload: JWTAuthPayload = {
    _id: user._id,
    role: <RoleEnum>user.role,
  };

  const token = createToken(jwtPayload, { expiresIn: AUTH_TOKEN_EXPIRATION });

  return { user, token };
};

export const SignUp = async ({
  data: { name, password, phone },
}: SignUpProps): Promise<SignUpOutput> => {
  try {
    const codeNumber = sendSms(phone);
    const foundUser = await User.findOne({ phone });

    if (foundUser) {
      throw new UserInputError(`User with phone '${phone}' is already exist`);
    }

    const isValidPassword = password.length > PASSWORD_MIN_LENGTH;

    if (!isValidPassword) {
      throw new UserInputError('Password is not strong enough');
    }

    const code = generateRandomNumbers(PHONE_CONFIRMATION_CODE_LENGTH);

    const tokenPayload = { name, phone, password, code, codeNumber };
    console.log(codeNumber);

    const createdToken = createToken(tokenPayload, {
      expiresIn: PHONE_CONFIRMATION_TOKEN_EXPIRATION,
    });

    return { token: createdToken };
  } catch (error) {
    console.log(error, 'Haliyam yozmabdi');
  }
};

export const confirmSignUp = async ({
  data: { code, token },
}: ConfirmSignUpProps): Promise<AuthOutput> => {
  const decodedToken = decodeToken<ConfirmPhoneTokenPayload>(token);

  const isTokenValid =
    decodedToken &&
    decodedToken.name &&
    decodedToken.password &&
    decodedToken.code &&
    decodedToken.phone;

  if (!isTokenValid) {
    throw new UserInputError('Invalid token');
  }

  const isCodeCorrect = code === decodedToken.code;

  if (!isCodeCorrect) {
    throw new UserInputError('Code is not correct');
  }

  const createdUser = await User.create({
    name: decodedToken.name,
    phone: decodedToken.phone,
    role: RoleEnum.user,
    password: decodedToken.password,
  });

  const tokenPayload: JWTAuthPayload = {
    _id: createdUser._id,
    role: <RoleEnum>createdUser.role,
  };

  const createdToken = createToken(tokenPayload, {
    expiresIn: AUTH_TOKEN_EXPIRATION,
  });

  return {
    token: createdToken,
    user: createdUser,
  };
};

export const signIn = async ({
  data: { phone, password },
}: SignInProps): Promise<AuthOutput> => {
  const foundUser = await User.findOne({ phone });

  if (password !== foundUser.password) {
    throw new BadRequestError('Password is not match!');
  }

  if (!foundUser) {
    throw new Error('Phone or password is not correct');
  }

  const isPasswordCorrect = await compareBcryptHash(
    <string>foundUser.password,
    password,
  );

  if (!isPasswordCorrect) {
    throw new Error('Phone or password is not correct');
  }

  const tokenPayload: JWTAuthPayload = {
    _id: foundUser._id,
    role: <RoleEnum>foundUser.role,
  };

  const createdToken = createToken(tokenPayload, {
    expiresIn: AUTH_TOKEN_EXPIRATION,
  });

  return {
    token: createdToken,
    user: foundUser,
  };
};
