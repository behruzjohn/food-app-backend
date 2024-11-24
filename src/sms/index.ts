const axios = require('axios');
import bcrypt from 'bcrypt';
import { PHONE_CONFIRMATION_CODE_LENGTH } from 'src/constants/auth';
import { generateRandomNumbers } from 'src/utils/crypto';

export const sendSms = async (number: string) => {
  try {
    const code = generateRandomNumbers(PHONE_CONFIRMATION_CODE_LENGTH);

    console.log('code', code);

    const data = {
      secret: '88e27bf9623f17c0efc3530b8fcce5ffef4f4e87',
      phone: `${number}`,
      mode: 'devices',
      device: '00000000-0000-0000-bf9a-a7b684c06c8d',
      sim: 1,
      priority: 1,
      message: `Ro'yhatdan o'tish codi: ${code}`,
    };

    const envVariable = 'SMS_CENTER_SINGLE_SMS_URL';

    // await axios.post(process.env[envVariable], data, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //   },
    // });
    // console.log(res, process.env[envVariable]);

    const hash = await bcrypt.hash(code + '', 10);

    return hash;
  } catch (error) {
    console.log(error);
  }
};
