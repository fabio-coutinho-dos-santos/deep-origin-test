import { Test } from '@nestjs/testing';
import { REPOSITORIES } from '../../../../../@shared/constants';
import { Url } from '../../../domain/urls';
import { CreateShortUrl } from '../create-short-url.usecase';
import { ValidateUrlService } from '../../services/validate-url-service';
import { UnprocessableEntityException } from '@nestjs/common';

describe('Create short url usecase Unit test', () => {
  const urlStub = new Url('https://www.google.com', 'sdr3h4', 1);

  const mockRepository = {
    createOrUpdate: jest.fn().mockResolvedValue(urlStub),
    findOne: jest.fn().mockResolvedValue(null),
  };

  const validateServiceMock = {
    isUrlValid: jest.fn().mockResolvedValue(false),
  };

  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: REPOSITORIES.URLS,
          useValue: mockRepository,
        },
        {
          provide: ValidateUrlService,
          useValue: validateServiceMock,
        },
        CreateShortUrl,
      ],
    }).compile();

    service = module.get<CreateShortUrl>(CreateShortUrl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('whith invalid url', () => {
    it('shold return unprocessable error', async () => {
      await expect(service.execute('invalid', 1)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('whith valid url', () => {
    it('shold return unprocessable error', async () => {
      validateServiceMock.isUrlValid.mockResolvedValue(true);

      const output = await service.execute(urlStub.original, urlStub.userId);
      expect(output).toMatchObject(urlStub);
    });
  });
});
