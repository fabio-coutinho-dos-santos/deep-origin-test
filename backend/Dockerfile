FROM node:20-alpine AS build

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/docs ./docs
COPY --from=build /app/assets ./assets

EXPOSE 3000

CMD npm run migration:runprod && node dist/src/main.js