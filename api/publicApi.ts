import trafficHost from './trafficHost';

class ResetPasswordApi {
  getPublicShortenLinkById(data: IPublicShortenById, headers?: any) {
    let url = `/public/get-shorten-link-by-id?id=${data.id}&ip=${data.ip}&country=${data.country}`;
    return trafficHost.get(url, {
      headers
    });
  }
  getNoteVerify(headers?: any) {
    let url = '/public/verify';
    return trafficHost.options(url, {
      headers
    });
  }

  getShortenByApiKey(data: IPublicShortenByApiKey, headers?: any) {
    let url = `/public/gen-shorten-link?url=${data.url}&apikey=${data.apikey}`;
    return trafficHost.get(url, {
      headers
    });
  }
}

const resetPasswordApi = new ResetPasswordApi();
export default resetPasswordApi;
