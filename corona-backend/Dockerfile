FROM rust:1-alpine3.14 as build

RUN apk update &&\
    apk upgrade &&\
    apk add --no-cache musl-dev

RUN mkdir /build

COPY . /build
WORKDIR /build

RUN ls -la /build &&\
    cargo build --release

FROM alpine:3.14

RUN apk update &&\
    apk add libgcc

COPY --from=build /build/target/release/corona-backend /usr/local/bin/corona-backend
RUN chmod +x /usr/local/bin/corona-backend

ENTRYPOINT /usr/local/bin/corona-backend