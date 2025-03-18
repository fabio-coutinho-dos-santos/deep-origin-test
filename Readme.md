# API-RESTful

RESTful API developed for user registration and consent events as a technical test for a senior backend engineer position at DIDOMI.

## Main elements used in the development

- node v20.9.0
- nestJs
- express
- react
- typescript
- postgres
- typeORM
- jest
- supertest
- eslint
- swagger
- docker
- docker compose

## Main design patterns adopted

- Clean Code
- Single Responsibility Principle (SRP)
- Don't repeat yourself (DRY)
- Keep it simple, stupid (KISS)
- You aren't gonna need it (YAGNI)
- Repository
- Dependency Injection
- Dependency Inversion
- Interface Segregation

## Code Architecture and Design

The API structure and folder hierarchy were defined by applying Domain-Driven Design (DDD) modeling practices along with Clean Architecture. This architecture protects business rules, with entities related to the core domain of the application at the center, keeping business-related parts on the periphery, as Clean and Hexagonal architectures suggest.

As part of DDD practices, domain entities were created with their respective validations from business rules, along with a folder hierarchy that maintains a ubiquitous language.

From a Clean Architecture perspective, anti-corruption layers were created between domain elements and application components, enabling both dependency injection and inversion, resulting in more decoupled code.

## Implementation Details

- Simple authentication with OAuth2 standard has been implemented, with API routes protected
- A rate limit has been implemented on the backend
- Implemented a check of the original URL
- User registration and login scheme separating data by accounts
- Mechanism to know how many times the shortened URL was visited
- Features have been implemented to update and delete created routes
- Git flow and conventional commits were used.
- Clean and event-driven architecture applied.
- Structured JSON logs for observability tool scraping.

### Due to the scope of this being a test application, the following were not included:

- Instrumentation for metrics, traces, and logs for observability.
- Full CI-CD pipeline for production deployment.
- User email verification.
- High test coverage.

## Details

- Running the application requires two databases, one for application data and another for integration testing. Locally, the docker compose file creates both databases, while only the application database was created in a provider (Render) for production.

- Backend application is deployed on Render and Frontend on Vercel.

- Backend production url: **https://deep-origin-test.onrender.com**

- Frontend production page: **https://deep-origin-test-y5k8.vercel.app**

## OpenAPI Documentation and Production Application

- OpenAPI documentation is in `docs/api.yaml` describing all application routes and can be accessed in: **https://deep-origin-test.onrender.com/api/v1/doc**

- To view this documentation and execute requests, Swagger can be configured for both local and production environments.

## Local Execution - Using Docker Compose

- To run the code locally with Docker Compose, clone the repository and follow these steps:

  - Create .env file in both projects as per .env.example files
  - Variables are detailed in `env-example`.
  - From the project root, run **docker-compose up**

    - It will run both projects and the frontend will run on localhost:4000

  - These steps will create database and application containers, and the application will start automatically.
