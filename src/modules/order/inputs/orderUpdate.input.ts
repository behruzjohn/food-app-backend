import { StatusEnum } from 'src/enums/status.enum';

export interface OrderStatusUpdateInput {
  status: StatusEnum;
}
