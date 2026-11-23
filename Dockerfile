# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder
WORKDIR /app

ARG PUBLIC_API_URL=https://api.theaver.app
ARG PUBLIC_STORAGE_URL=https://storage.theaver.app
ARG PUBLIC_WEB_APP_URL=https://app.theaver.app

ENV PUBLIC_API_URL=$PUBLIC_API_URL \
    PUBLIC_STORAGE_URL=$PUBLIC_STORAGE_URL \
    PUBLIC_WEB_APP_URL=$PUBLIC_WEB_APP_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

RUN addgroup -S theaver && adduser -S theaver -G theaver

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER theaver
EXPOSE 4321

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1:4321/api/health | grep -q '"ok"' || exit 1

CMD ["node", "./dist/server/entry.mjs"]
