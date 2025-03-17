import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../../@infra/database/typeorm/database.service';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';
import { UsersSchema } from '../../../modules/users/infra/entities/users.schema';
import * as bcrypt from 'bcryptjs';
import { BCRYPT } from '../../../@shared/constants';

describe('Auth E2E tests', () => {
  let app;
  let httpServer;
  let repository;

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

    repository = connection.getRepository(UsersSchema);
  });

  describe('POST /auth/login', () => {
    describe('when invalid credentials', () => {
      it('should return unauthorized error', async () => {
        const loginBody = {
          email: 'invalid@gmail.com',
          password: 'password',
        };
        return request(httpServer)
          .post('/api/v1/auth/login')
          .send(loginBody)
          .expect(HttpStatus.UNAUTHORIZED);
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

        await repository.delete({});

        await repository.save(createUserBody);

        const output = await request(httpServer)
          .post('/api/v1/auth/login')
          .send(loginBody);
        expect(output.status).toBe(HttpStatus.OK);
      });
    });
  });
});
