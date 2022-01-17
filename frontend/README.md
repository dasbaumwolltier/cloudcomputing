## Getting Started

For local development please follow the instructions below.

### Requirements

**Supported operating systems**:

- Linux
- macOS
- Windows 10+
- Docker - if you want to build a Docker image

**Node:**

- NodeJS >= 14 <= 16
- NPM >= 6.x
- Yarn >= 1.22 < 2

### Prerequisites for development

You need to have a working and active [NodeJS](https://nodejs.org/en/) installation.

Additionally you need to run the following commands in order to start the development application:

* yarn
  ```sh
  npm install -g yarn@1.22
  ```

* dependency installation
  ```sh
  yarn install
  ```

* start React in development mode
  ```sh
  yarn start
  ```

* access the application in the browser via
  ```sh
  http://localhost:3000
  ```

### Building & serving a Docker image

If you only want to build a Docker image of the frontend, you might want to run

```sh
docker build . -t frontend
```

and to serve it on ``http://localhost``

```sh
docker run -p 80:80 frontend
```

