FROM node:latest

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn global add cross-env

COPY . .

RUN yarn build