FROM node:14-alpine as base

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY public ./public
COPY src ./src
COPY craco.config.js ./craco.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY tsconfig.json ./tsconfig.json

RUN yarn build


# second stage containing only necessary files & directories
FROM nginx:1.20-alpine

# copy build folder into default web server folder
COPY --from=base /build /usr/share/nginx/html
