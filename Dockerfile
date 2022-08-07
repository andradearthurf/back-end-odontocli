FROM node

WORKDIR /usr/app

COPY package.json /usr/app

COPY yarn.lock /usr/app

RUN yarn install 

COPY . /usr/app

EXPOSE 3333