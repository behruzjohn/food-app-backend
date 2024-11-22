import { SignUpProps } from '../props/SignUp.props';

export type ConfirmPhoneTokenPayload = SignUpProps & {
  code: string;
};
