import { ReactNode } from "react";

export interface InputWithIconProps {
  title: string;
  name: string;
  icon: ReactNode; 
  placeholder: string;
  as: string; 
}

export interface IUserLogin {
    email:string | null,
    google?:boolean;
}

export interface Props {
    onClose: () => void;
  }
  
 export interface CustomJwtPayload {
    name: string;
    email: string;
  }
  
 export interface UserValues {
    email: string;
    password?:string;
    google?:boolean;
  }


 export interface UserState {
    loading: boolean;
    user: UserType | null;
    error: ErrorType | null;
  }

  export interface UserType{
    id: string;
  email: string;
  name: string;
  }

  export interface ErrorType{
    message: string;
    statusCode?: number;  
    code?: string;    
    details?: any; 
  }