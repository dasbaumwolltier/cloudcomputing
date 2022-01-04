FROM node:14-alpine as base

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN yarn build


# second stage containing only necessary files & directories
FROM node:14-alpine

COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

EXPOSE 8081
CMD ["dist/index.js"]
