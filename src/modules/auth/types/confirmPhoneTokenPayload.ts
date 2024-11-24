import { SignUpProps } from '../props/signUp.props';

export type ConfirmPhoneTokenPayload = SignUpProps & {
  code: string;
};
