import trafficHost from './trafficHost';
class GeneralityApi {
  createGeneralityApi(data: ILinkApiCreate, headers: any = null) {
    let url = '/generality/save-generality-api?type=1';

    return trafficHost.post(
      url,
      {
        site_name: data.siteName,
        site_api: data.siteApi,
        max_view: data.maxView,
        priority: data.priority,
        description: data.description,
        status: data.status,
        is_timer: data.isTimer,
        minute: data.minute,
        hour: data.hour,
        countrys: data.countrys
      },
      {
        headers: headers
      }
    );
  }

  updateGeneralityApi(data: ILinkApi, headers: any = null) {
    let url = '/generality/save-generality-api?type=2';

    return trafficHost.post(
      url,
      {
        id: data.id,
        site_name: data.siteName,
        site_api: data.siteApi,
        max_view: data.maxView,
        priority: data.priority,
        description: data.description,
        status: data.status,
        is_timer: data.isTimer,
        minute: data.minute,
        hour: data.hour,
        countrys: data.countrys,
        deleted: data.deleted,
        created: data.created
      },
      {
        headers: headers
      }
    );
  }

  deleteGeneralityApi(data: Pick<ILinkApi, 'id'>, headers: any = null) {
    let url = '/generality/save-generality-api?type=3';

    return trafficHost.post(
      url,
      {
        id: data.id
      },
      {
        headers: headers
      }
    );
  }

  onOffGeneralityApi(data: ILinkApi, headers: any = null) {
    let url = '/generality/on-off-generality-api';

    return trafficHost.post(
      url,
      {
        id: data.id,
        site_name: data.siteName,
        site_api: data.siteApi,
        max_view: data.maxView,
        priority: data.priority,
        description: data.description,
        status: data.status,
        is_timer: data.isTimer,
        minute: data.minute,
        hour: data.hour,
        countrys: data.countrys,
        deleted: data.deleted,
        created: data.created
      },
      {
        headers: headers
      }
    );
  }

  searchGeneralityApi(value: ISearchLinkApi, headers: any = null) {
    let url = `/generality/search-generality-api?page=${value.page}&size=${value.size}`;
    if (value.text) url += `&text=${value.text}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  getGeneralityApiById(id: string | number, headers: any = null) {
    let url = `/generality/get-generality-api-by-id?id=${id}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  // Shorten Link
  createShortenLinkApi(data: IShortenLinkCreateApi, headers: any = null) {
    let url = '/generality/save-shorten-link?type=1';

    return trafficHost.post(
      url,
      {
        url_source: data.urlSource,
        alias: data.alias
      },
      {
        headers: headers
      }
    );
  }

  updateShortenLinkApi(data: IShortenLinkApi, headers: any = null) {
    let url = '/generality/save-shorten-link?type=2';

    return trafficHost.post(
      url,
      {
        id: data.id,
        url_source: data.urlSource,
        alias: data.alias,
        deleted: data.deleted,
        created: data.created
      },
      {
        headers: headers
      }
    );
  }

  deleteShortenLinkApi(data: Pick<IShortenLinkApi, 'id'>, headers: any = null) {
    let url = '/generality/save-shorten-link?type=3';

    return trafficHost.post(
      url,
      {
        id: data.id
      },
      {
        headers: headers
      }
    );
  }

  searchShortenLinkyApi(value: ISearchLinkApi, headers: any = null) {
    let url = `/generality/search-shorten-link?page=${value.page}&size=${value.size}`;
    if (value.text) url += `&text=${value.text}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  getShortenLinkApiById(id: string | number, headers: any = null) {
    let url = `/generality/get-shorten-link-by-id?id=${id}`;
    return trafficHost.get(url, {
      headers: headers
    });
  }

  getTop10Links(headers: any = null) {
    let url = `/generality/get-top-10`;
    return trafficHost.get(url, {
      headers: headers
    });
  }
}

const generalityApi = new GeneralityApi();
export default generalityApi;
