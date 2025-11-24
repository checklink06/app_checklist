import trafficHost from './trafficHost';

class ResetPasswordApi {
  sendEmailForgotPassword(data: ISendEmailForgotPasswordAPI, headers?: any) {
    let url = '/ResetPassword/send-email-forgot-password?email=' + data.email;
    return trafficHost.get(url, {
      headers
    });
  }

  validResetPassword(data: IValidResetPasswordAPI, headers?: any) {
    let url = '/ResetPassword/valid-reset-password?token=' + data.token;
    return trafficHost.get(url, {
      headers
    });
  }

  resetPassword(data: IResetPasswordAPI, headers?: any) {
    let url = '/ResetPassword/reset-password';
    return trafficHost.post(
      url,
      {
        token: data.token,
        password: data.password
      },
      {
        headers
      }
    );
  }
}

const resetPasswordApi = new ResetPasswordApi();
export default resetPasswordApi;
