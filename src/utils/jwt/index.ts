import * as jwt from 'jsonwebtoken';

export function decodeToken<T extends Record<string, unknown>>(token: string) {
  return jwt.decode(token) as Partial<T> & jwt.JwtPayload;
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
