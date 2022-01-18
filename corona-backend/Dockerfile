FROM dasbaumwolltier/rust-musl-builder as build

COPY --chown=rust:rust . /build
WORKDIR /build

RUN ls -la /build &&\
    cargo build --release

RUN ls -la /build/target

FROM alpine:3.15

RUN apk update &&\
    apk upgrade &&\
    apk --no-cache add ca-certificates

COPY --from=build /build/target/x86_64-unknown-linux-musl/release/corona-backend /usr/local/bin/corona-backend
RUN chmod +x /usr/local/bin/corona-backend

ENTRYPOINT /usr/local/bin/corona-backend