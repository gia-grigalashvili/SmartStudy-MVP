export interface IForgotTeacherPasswordVerification {
  email: string;
  code: string;
}

export interface IResetTeacherPassword {
  email: string;
  code: string;
  password: string;
}

export interface ITeacherLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IForgotPasswordVerification {
  email: string;
  smsCode: string;
}

export interface IOtpVerification {
  code: string;
}

export interface IOtpCodeResend {
  email: string;
}

export interface IForgetPasswordWithEmail {
  email: string;
}
