import { Url } from './urls';

describe('Url Domain Model', () => {
  it('should create a valid Url instance', () => {
    const url = new Url('https://example.com', 'short1', 1);
    expect(url).toBeDefined();
    expect(url.original).toBe('https://example.com');
    expect(url.shortened).toBe('short1');
    expect(url.userId).toBe(1);
    expect(url.hits).toBe(0);
    expect(url.createdAt).toBeInstanceOf(Date);
  });

  it('should throw an error if original URL is empty', () => {
    expect(() => new Url('', 'short1', 1)).toThrow();
  });

  it('should throw an error if original URL is invalid', () => {
    expect(() => new Url('invalid-url', 'short1', 1)).toThrow();
  });

  it('should throw an error if shortened URL is empty', () => {
    expect(() => new Url('https://example.com', '', 1)).toThrow();
  });

  it('should throw an error if shortened URL is less than 5 characters', () => {
    expect(() => new Url('https://example.com', 'abc', 1)).toThrow();
  });

  it('should allow updating hits count', () => {
    const url = new Url('https://example.com', 'short1', 1);
    url.hits = 10;
    expect(url.hits).toBe(10);
  });

  it('should allow setting updatedAt and deletedAt', () => {
    const url = new Url('https://example.com', 'short1', 1);
    const updateDate = new Date();
    url.updatedAt = updateDate;
    expect(url.updatedAt).toBe(updateDate);

    const deleteDate = new Date();
    url.deletedAt = deleteDate;
    expect(url.deletedAt).toBe(deleteDate);
  });
});
