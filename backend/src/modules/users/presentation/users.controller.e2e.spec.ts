import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../../@infra/database/typeorm/database.service';
import { AppModule } from '../../../app.module';
import { UsersSchema } from '../infra/entities/users.schema';
import * as request from 'supertest';

describe('Users E2E tests', () => {
  let app;
  let httpServer;

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

    const repository = connection.getRepository(UsersSchema);
    await repository.delete({});
  });

  describe('POST /users/register', () => {
    describe('when invalid name', () => {
      it('should return bad request error', async () => {
        const createUserBody = {
          name: '',
          email: 'test@gmail.com',
          password: 'password',
        };
        return request(httpServer)
          .post('/api/v1/users/register')
          .send(createUserBody)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('when invalid email', () => {
      it('should return bad request error', async () => {
        const createUserBody = {
          name: 'valid name',
          email: 'test.gmail.com',
          password: 'password',
        };
        return request(httpServer)
          .post('/api/v1/users/register')
          .send(createUserBody)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('when invalid password', () => {
      it('should return bad request error', async () => {
        const createUserBody = {
          name: 'valid name',
          email: 'test@gmail.com',
          password: '',
        };
        return request(httpServer)
          .post('/api/v1/users/register')
          .send(createUserBody)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('when valid data', () => {
      it('should create a new user', async () => {
        const createUserBody = {
          name: 'valid name',
          email: 'test@gmail.com',
          password: 'password',
        };
        return request(httpServer)
          .post('/api/v1/users/register')
          .send(createUserBody)
          .expect(HttpStatus.CREATED);
      });
    });
  });
});
