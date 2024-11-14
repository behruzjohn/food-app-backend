import { CourierInput } from 'src/modules/admin/inputs/courier.input';
import { GetCourierByIdProps } from './getCourierById.props';

export type UpdateCourierByIdProps = GetCourierByIdProps & {
  data: Partial<CourierInput>;
};
