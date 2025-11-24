import authHost from './authHost';
class AuthApi {
  loginUser(data: ILogin) {
    let url = '/identity/Login';

    return authHost.post(url, {
      user_name: data.userName,
      password: data.password,
      client_id: data.clientId,
      realms: data.realms,
      scope: data.scope
    });
  }

  logoutUser(data: IUserInfo, headers?: any) {
    let url = '/identity/logout';

    return authHost.post(
      url,
      {
        user_id: data.userId,
        user_name: data.userName,
        client_id: data.clientId,
        realms: data.realms
      },
      {
        headers: headers
      }
    );
  }

  registerUser(data: IRegister) {
    let url = '/identity/create-user';

    return authHost.post(url, {
      user_name: data.userName,
      password: data.password,
      user_id: data.userId,
      phone_number: data.phoneNumber,
      email: data.email,
      full_name: data.fullName,
      first_name: data.firstName,
      last_name: data.lastName,
      realms: data.realms,
      client_id: data.clientId,
      province: data.province,
      district: data.district,
      country_code: data.countryCode,
      country_name: data.countryName,
      postal_code: data.postalCode,
      address: data.address,
      payment_method_code: data.paymentMethodCode,
      payment_method_name: data.paymentMethodName,
      payment_account: data.paymentAccount,
      api_key: data.apiKey,
      is_locked: data.isLocked,
      violation_counter: data.violationCounter,
      expiry_type: data.expiryType,
      url_qr_img: data.urlQrImg,
      user_type: data.userType,
      created: data.created,
      credit: data.credit
    });
  }

  updateUserInfo(data: IUserInfo, headers: any) {
    let url = '/identity/update-user';

    return authHost.post(
      url,
      {
        user_name: data.userName,
        user_id: data.userId,
        phone_number: data.phoneNumber,
        email: data.email,
        full_name: data.fullName,
        first_name: data.firstName,
        last_name: data.lastName,
        realms: data.realms,
        client_id: data.clientId,
        province: data.province,
        district: data.district,
        country_code: data.countryCode,
        country_name: data.countryName,
        postal_code: data.postalCode,
        address: data.address,
        payment_method_code: data.paymentMethodCode,
        payment_method_name: data.paymentMethodName,
        payment_account: data.paymentAccount,
        api_key: data.apiKey,
        is_locked: data.isLocked,
        violation_counter: data.violationCounter,
        expiry_type: data.expiryType,
        url_qr_img: data.urlQrImg,
        user_type: data.userType,
        created: data.created,
        credit: data.credit
      },
      {
        headers: headers
      }
    );
  }
}

const authApi = new AuthApi();
export default authApi;
