import bcrypt from 'bcrypt';

export const sendSms = async (phone: string) => {
  const code = '12345';

  console.log(`📩 FIXED SMS CODE for ${phone}: ${code}`);

  const hash = await bcrypt.hash(code, 10);
  return hash;
};
