import { Url } from '../../domain/urls';

export class UrlsPresenter {
  static presentOne(data: Url) {
    return {
      id: data.id,
      original: data.original,
      shortened: data.shortened,
      hits: data.hits,
    };
  }

  static presentAll(data: Url[]) {
    return data.map((url) => this.presentOne(url));
  }
}

export type UrlsPresenterType = {
  id: number;
  original: string;
  shortened: string;
  hits: number;
};
