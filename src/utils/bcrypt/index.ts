import bcrypt from 'bcrypt';

export const hash = (data: string, rounds: number = 10) => {
  return bcrypt.hash(data, rounds);
};

export const compareBcryptHash = (hash: string, data: string) => {
  return bcrypt.compare(hash, data);
};
