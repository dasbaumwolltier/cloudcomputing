<div id="top"></div>

<div align="center">
  <h3 align="center">Documentation</h3>
</div>

<details>
  <summary>Overview</summary>
  <ol>
    <li><a href="#description">Project description</a></li>
    <li>
      <a href="#services">Services</a>
      <ul>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#corona-backend">Corona Backend</a></li>
		    <li><a href="#country-backend">Country Backend</a></li>
      </ul>
    </li>
    <li>
      <a href="#used-technologies">Used Technologies</a>
      <ul>
        <li><a href="#todo">ArgoCD</a></li>
        <li><a href="#todo">TODO</a></li>
		    <li><a href="#todo">TODO</a></li>
      </ul>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
      <ul>
        <li><a href="#todo">TODO</a></li>
      </ul>
    </li>
  </ol>
</details>


## Project description

The project should show how much effort and development is needed to have a fully automated CI/CD flow using GitHub Actions as a CI for building, (testing), and creating deployment images as well as a tool called ArgoCD as continuous delivery tool.

To better showcase this, we built three different applications namely one frontend and two backends to get a good feeling how fast and easy we can develop and ship a new versions of an entire microservice architecture.

The basic idea behind the application is, to have the frontend request the two backends for different data. In our case, we chose to provide the newest COVID-19 data for each country worldwide. For this, we are using two external APIs which in theory could be replaced with our own data which could be stored in a database also running somewhere in the cluster.

The following illustration should show the whole architecture we are using

![Architecture Diagram](architecture-diagram.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## Services

<p align="right">(<a href="#top">back to top</a>)</p>

### Frontend

The frontend is built using [React.js](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) as a CSS framework. Its main purpose is, to fetch data from our two backends which includes an API to fetch all countries worldwide including their flag and other additional data. The second API provides the most-recent COVID-19 data for a selected country (provided as parameter).

For building the image, the build process makes use of multi-stage builds which main advantage is to keep the built image size low. For this, the build contains two stages, one where [NodeJS](https://nodejs.org/) is set up, where all packages (node_modules) are installed to build the frontend. The second stage is the "real" image which is pushed to the registry that in our case only copies the built frontend to our defined destination (Nginx default web server folder).

```Dockerfile
FROM node:14-alpine as base

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

...
... # copy some files
...

RUN yarn build # build frontend (saved to /build)

# second stage containing only necessary files & directories
FROM nginx:1.20-alpine

# copy build folder into default web server folder
COPY --from=base /build /usr/share/nginx/html 
```
_[Frontend Dockerfile](frontend/Dockerfile)_


For the resulting image which is pushed to the registry, we chose Nginx's alpine version to keep the size as low as possible for serving the frontend to the public.


<p align="right">(<a href="#top">back to top</a>)</p>

### Corona Backend
<p align="right">(<a href="#top">back to top</a>)</p>

### Country Backend
<p align="right">(<a href="#top">back to top</a>)</p>

## Used Technologies

<p align="right">(<a href="#top">back to top</a>)</p>

### ArgoCD
ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes which helps us to automate, audit, and easy understand our application definitions, configurations and environments. It also is versioned controlled which means that we can always recover and rollback fairly easy and fast. 

<p align="right">(<a href="#top">back to top</a>)</p>

### Todo
<p align="right">(<a href="#top">back to top</a>)</p>

### Todo
<p align="right">(<a href="#top">back to top</a>)</p>

## Deployment
