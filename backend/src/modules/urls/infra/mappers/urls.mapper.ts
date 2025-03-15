import { Url } from '../../domain/urls';
import { UrlsSchema } from '../entities/urls.schema';

export class UrlsMapper {
  public static toDomain(raw: UrlsSchema): Url {
    const {
      id,
      original,
      shortened,
      userId,
      hits,
      createdAt,
      updatedAt,
      deletedAt,
    } = raw;
    const url = new Url(original, shortened, userId);
    url.id = id;
    url.hits = hits;
    url.createdAt = createdAt;
    url.updatedAt = updatedAt;
    url.deletedAt = deletedAt;
    return url;
  }

  public static toPersistence(domain: Url): Partial<UrlsSchema> {
    return {
      id: domain.id,
      original: domain.original,
      shortened: domain.shortened,
      hits: domain.hits,
      userId: domain.userId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    };
  }
}
