FROM dasbaumwolltier/rust-musl-builder as build

# RUN apk update &&\
#     apk upgrade &&\
#     apk add --no-cache musl-dev openssl-dev pkgconf

# RUN apt update &&\
#     apt upgrade -y &&\
#     apt install -y libssl-dev

# RUN pacman -Suy --noconfirm &&\
#     pacman -S --noconfirm rustup base-devel &&\
#     rustup install stable

# RUN mkdir /build

COPY --chown=rust:rust . /build
WORKDIR /build

RUN ls -la /build &&\
    cargo build --release
    # RUSTFLAGE="-C link-arg=-static" cargo build --release
    # RUSTFLAGS="-C target-feature=-crt-static" cargo build --release

RUN ls -la /build/target

FROM alpine:3.15

RUN apk update &&\
    apk upgrade &&\
    apk --no-cache add ca-certificates

# RUN apt update &&\
#     apt install -y openssl

# RUN pacman -Suy --noconfirm &&\
#     pacman -S --noconfirm openssl

COPY --from=build /build/target/x86_64-unknown-linux-musl/release/corona-backend /usr/local/bin/corona-backend
RUN chmod +x /usr/local/bin/corona-backend

ENTRYPOINT /usr/local/bin/corona-backend