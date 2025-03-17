import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../../@infra/database/typeorm/database.service';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';
import { UsersSchema } from '../../users/infra/entities/users.schema';
import { UrlsSchema } from '../infra/entities/urls.schema';
import { CreateShortUrlDto } from '../application/dtos/create-short-url-dto';
import * as bcrypt from 'bcryptjs';
import { BCRYPT } from '../../../@shared/constants';

describe('Urls E2E tests', () => {
  let app;
  let httpServer;
  let usersRepo;
  let urlsRepo;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseService],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    httpServer = app.getHttpServer();

    const databaseService = moduleRef.get<DatabaseService>(DatabaseService);
    const connection = databaseService.getDbHandle();

    usersRepo = connection.getRepository(UsersSchema);
    usersRepo.delete({});

    urlsRepo = connection.getRepository(UrlsSchema);
    urlsRepo.delete({});
  });

  describe('POST /urls/shortened/create', () => {
    describe('when invalid jwt token', () => {
      it('should return unauthorized error', async () => {
        const input: CreateShortUrlDto = {
          url: 'https://www.google.com',
          userId: 1,
        };

        return request(httpServer)
          .post('/api/v1/urls/shortened/create')
          .send(input)
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('when with invalid url', () => {
      it('should create a new user', async () => {
        const password = 'password';

        const hashedPassword = await bcrypt.hash(password, BCRYPT.SALT_ROUNDS);

        const createUserBody = {
          name: 'valid name',
          email: 'name@gmail.com',
          password: hashedPassword,
        };

        const loginBody = {
          email: 'name@gmail.com',
          password: 'password',
        };

        await usersRepo.delete({});

        await usersRepo.save(createUserBody);

        const output = await request(httpServer)
          .post('/api/v1/auth/login')
          .send(loginBody);

        const token = output.body.accessToken;

        const input: CreateShortUrlDto = {
          url: 'https.www.google.com',
          userId: 1,
        };

        return await request(httpServer)
          .post('/api/v1/urls/shortened/create')
          .set('Authorization', `Bearer ${token}`)
          .send(input)
          .expect(HttpStatus.UNPROCESSABLE_ENTITY);
      });
    });

    describe('when with valid credentials', () => {
      it('should create a new user', async () => {
        const password = 'password';

        const hashedPassword = await bcrypt.hash(password, BCRYPT.SALT_ROUNDS);

        const createUserBody = {
          name: 'valid name',
          email: 'name@gmail.com',
          password: hashedPassword,
        };

        const loginBody = {
          email: 'name@gmail.com',
          password: 'password',
        };

        await usersRepo.delete({});

        await usersRepo.save(createUserBody);

        const output = await request(httpServer)
          .post('/api/v1/auth/login')
          .send(loginBody);

        const token = output.body.accessToken;

        const input: CreateShortUrlDto = {
          url: 'https://www.google.com',
          userId: 1,
        };

        return await request(httpServer)
          .post('/api/v1/urls/shortened/create')
          .set('Authorization', `Bearer ${token}`)
          .send(input)
          .expect(HttpStatus.CREATED);
      });
    });
  });
});
