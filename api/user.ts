import trafficHost from './trafficHost';
class UserApi {
  getInfoUser(headers: any) {
    let url = '/user/get-info-user';
    return trafficHost.get(url, {
      headers
    });
  }

  checklogin(headers?: any) {
    let url = '/user/check-login';
    return trafficHost.get(url, {
      headers
    });
  }

  updatePassword(data: IUpdatePasswordAPI, headers?: any) {
    let url = '/user/update-password';
    return trafficHost.post(
      url,
      {
        old_password: data.oldPassword,
        new_password: data.newPassword
      },
      {
        headers
      }
    );
  }

  getInfoDashboard(headers?: any) {
    let url = '/user/get-info-dashboad';
    return trafficHost.get(url, {
      headers: headers
    });
  }

  getInfoDashboardByDate(data: { fromDate: string; toDate: string }, headers?: any) {
    let url = `/user/get-info-dashboad-by-date?fromdate=${data.fromDate}&todate=${data.toDate}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  getOnOffApiNewDay(headers?: any) {
    let url = `/user/get-on-off-api-24h`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  onOffApiNewDay(isStart: boolean, headers?: any) {
    let url = `/user/on-off-api-24h?isStart=${isStart}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }
}

const userApi = new UserApi();
export default userApi;
