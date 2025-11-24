interface IUserInfo extends IAuth {
  userName?: string;
  password?: string;
  userId?: string;
  phoneNumber?: string;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  province?: string;
  district?: string;
  countryCode?: string;
  countryName?: string;
  postalCode?: string;
  address?: string;
  paymentMethodCode?: string;
  paymentMethodName?: string;
  paymentAccount?: string;
  apiKey?: string;
  isLocked?: boolean;
  violationCounter?: number;
  expiryType?: number;
  urlQrImg?: string;
  userType?: number;
  created?: number;
  credit?: number;
}

interface IUpdatePasswordAPI {
  oldPassword: string;
  newPassword: string;
}

interface ISendEmailForgotPasswordAPI {
  email: string;
}

interface IValidResetPasswordAPI {
  token: string;
}

interface IResetPasswordAPI {
  token: string;
  password: string;
}
