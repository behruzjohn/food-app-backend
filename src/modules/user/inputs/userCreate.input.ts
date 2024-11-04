import { RoleEnum } from 'src/enums/role.enum';

export interface UserInput {
  name: String;
  telegramId: Number;
  role: RoleEnum;
  phone: String;
}
