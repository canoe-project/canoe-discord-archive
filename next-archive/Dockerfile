FROM node:lts as dependencies
WORKDIR /next-archive
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /next-archive
COPY . .
COPY --from=dependencies /next-archive/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /next-archive
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /next-archive/next.config.js ./
COPY --from=builder /next-archive/public ./public
COPY --from=builder /next-archive/.next ./.next
COPY --from=builder /next-archive/node_modules ./node_modules
COPY --from=builder /next-archive/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]