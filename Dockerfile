## base image
FROM node:14-alpine AS build
## default http port set to 8000

## set working directory
WORKDIR /app

## add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

## install and cache app dependencies
## create user "node" and give permissions
COPY package*.json ./
RUN npm install

## add app
COPY . ./

## build the project
RUN npm run build

## Second stage: runtime
FROM nginx:latest
#ARG port=8000

## get the built application from the first stage to htdocs
COPY --from=build /app/build /usr/share/nginx/html

## Set default http port
RUN sed -i -r "s/(listen\s*)(80)/\1${port}/" /etc/nginx/conf.d/default.conf
