import * as jwt from 'jsonwebtoken';
import { BadUserInputError } from 'src/common';

export function decodeToken<T extends Record<string, unknown>>(token: string) {
  try {
    return jwt.verify(token || '', process.env.SECRET_KEY) as Partial<T> &
      jwt.JwtPayload;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired({ exp = 0 }: jwt.JwtPayload) {
  return exp * 1000 - new Date().getTime() < 0;
}

export function createToken(
  payload: string | Buffer | object,
  options?: jwt.SignOptions,
  secret: string = process.env.SECRET_KEY,
) {
  return jwt.sign(payload, secret, options);
}
