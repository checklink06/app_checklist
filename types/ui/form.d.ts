interface ILoginForm {
  userName: string;
  password: string;
}

interface IRegisterForm {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface RuleForm {
  name?: 'required' | 'regex';
  regex?: string;
  message?: string;
}

interface ICreateLinkForm {
  siteName: string;
  siteApi: string;
  maxView: number;
  priority: number;
  description: string;
  status: number;
  isTimer: boolean;
  minute: number;
  hour: number;
  countrys: string;
}

interface IUpdateLinkForm extends ILinkApi {}

interface ICreateShortenLinkForm {
  urlSource: string;
  alias: string;
}

interface IUpdateShortenLinkForm {
  id: string;
  urlSource: string;
  alias: string;
  deleted?: boolean;
  created?: number;
}

interface IUpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface IUpdateUserInfoForm extends IUserInfo {}

interface ISendEmailForgotPasswordForm {
  email: string;
}

interface IValidResetPasswordForm {
  token: string;
}

interface IResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

interface IPublicRedirectForm {
  weblink: string;
  shortlink: string;
}
