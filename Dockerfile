FROM node:alpine

RUN apk add --update git


RUN mkdir /usr/local/src
COPY . /usr/local/src
WORKDIR /usr/local/src


RUN npm install
RUN npm install eslint@5.16.0


EXPOSE 3000

CMD [ "npm", "start" ]