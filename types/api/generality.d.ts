interface ILinkApi {
  id: string;
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
  deleted: boolean;
  created: number;
}

interface ILinkApiCreate extends ILinkApi {
  id?: string;
  deleted?: boolean;
  created?: number;
}

interface ISearchLinkApi {
  text?: string;
  page?: number;
  size?: number;
}

interface IShortenLinkApi {
  id: string;
  urlSource: string;
  alias: string;
  deleted?: boolean;
  created?: number;
}

interface IShortenLinkCreateApi extends IShortenLinkApi {
  id?: string;
}

interface ISearchShortenLinkApi {
  text?: string;
  page?: number;
  size?: number;
}
