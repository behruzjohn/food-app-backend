import { UserRoleEnum } from 'src/enums/userRole.enum';
import { AuthInput } from '../inputs/auth.input';

export type SignInProps = {
  role: UserRoleEnum;
  data: AuthInput;
};
