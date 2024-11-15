import { User } from 'src/modules/user/user.model';

export type GetCouriersProps = {
  name: String;
  phone: typeof User.schema.obj.phone;
};
