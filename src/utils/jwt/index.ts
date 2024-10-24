import * as jwt from "jsonwebtoken";

export function decodeToken<T extends Record<string, any>>(token: string) {
  return jwt.decode(token) as Partial<T> & jwt.JwtPayload;
}

export function isTokenExpired({ exp = 0 }: jwt.JwtPayload) {
  return exp - new Date().getTime() < 0;
}
