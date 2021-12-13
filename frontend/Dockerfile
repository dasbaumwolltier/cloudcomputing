FROM nginx:1.20-alpine

ADD build/ /build

WORKDIR / 

COPY /build /usr/share/nginx/html
