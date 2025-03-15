import { Url } from '../../domain/urls';

export class UrlsPresenter {
  static presentOne(data: Url) {
    return {
      original: data.original,
      shortened: data.shortened,
    };
  }

  static presentAll(data: Url[]) {
    return data.map((url) => this.presentOne(url));
  }
}

export type UrlsPresenterType = {
  original: string;
  shortened: string;
};
