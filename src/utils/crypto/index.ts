import * as crypto from 'crypto';
import {
  BINARY_ENCODINGS,
  HASH_ALGORITHMS,
} from 'src/utils/crypto/crypto.constants';

export function matchSha256Hash<
  T extends Record<string, unknown> & { hash: string },
>(data: T, secretKey: string) {
  if (!data || typeof data !== 'object' || !data.hash) {
    throw new Error('Invalid data format or missing hash.');
  }

  const content = Object.keys(data)
    .filter((key) => data[key] && key !== 'hash')
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('\n');

  const secret = crypto
    .createHash(HASH_ALGORITHMS.SHA256)
    .update(secretKey)
    .digest();

  const hash = crypto
    .createHmac(HASH_ALGORITHMS.SHA256, secret)
    .update(content)
    .digest(BINARY_ENCODINGS.HEX);

  const isMatch = hash === data.hash;

  return isMatch;
}

export const generateRandomNumbers = (length: number) => {
  return new Date()
    .getTime()
    .toString()
    .slice(length * -1);
};
