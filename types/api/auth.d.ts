interface IRegister extends IUserInfo {
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ILogin extends IAuth {
  userName: string;
  password: string;
  scope?: string;
}

interface IAuth {
  clientId: string;
  realms: string;
}
