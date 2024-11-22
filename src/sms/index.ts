const axios = require('axios');
import bcrypt from 'bcrypt';

export const sendSms = async (number: string) => {
  const code = Math.floor(Math.random() * 90000) + 10000;

  const data = {
    secret: '88e27bf9623f17c0efc3530b8fcce5ffef4f4e87',
    phone: `${number}`,
    mode: 'devices',
    device: '00000000-0000-0000-bf9a-a7b684c06c8d',
    sim: 1,
    priority: 1,
    message: `${code}`,
  };

  const envVariable = 'SMS_CENTER_SINGLE_SMS_URL';

  await axios.post(process.env[envVariable], data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

  return bcrypt.hash(
    code + '',
    "'fazliddino'ylabtopishimumkinbo'lganengyaxshigapshuyaxshimi?",
  );
};
