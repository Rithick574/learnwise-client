import { ReactNode } from "react";

export interface InputWithIconProps {
  title: string;
  name: string;
  icon: ReactNode;
  placeholder: string;
  as: any;
  theme: string;
}

export interface IUserLogin {
  email: string | null;
  google?: boolean;
}

//  export interface CustomJwtPayload {
//     name: string;
//     email: string;
//   }

//  export interface UserValues {
//     email: string;
//     password?:string;
//     google?:boolean;
//   }

export interface UserState {
  loading: boolean;
  user: UserType | null;
  error: ErrorType | null;
}

export interface UserType {
  id: string;
  email: string;
  name: string;
}

export interface ErrorType {
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
}

export interface OTPEntersectionProps {
  email?: string;
  setOTPExpired?: (expired: boolean) => void;
  setOTPSec?: (open: boolean) => void;
  dispatchSignUp: (otp: string[]) => void;
}

export interface SignUpFormData  {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordconfirm?: string;
  phoneNumber?: string;
}
