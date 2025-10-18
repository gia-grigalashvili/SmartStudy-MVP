export interface IForgotStudentPasswordVerification {
  email: string;
  code: string;
}

export interface IResetStudentPassword {
  email: string;
  code: string;
  password: string;
}

export interface IStudentLogin {
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
