export interface ExtendedRegisterProps {
  email: string;
  login: string;
  password: string;
}

export interface RegisterFormProps {
  isRegisterOk: (ok: boolean) => void;
  callbackData: (email: string, login: string, password: string) => void;
}
