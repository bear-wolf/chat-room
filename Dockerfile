#COPY ./package*.json ./var/www/
#RUN npm install


FROM alpine:latest
FROM node:8

RUN mkdir /var/www
WORKDIR /var/www
COPY ./package*.json ./

#Server part --------------------
RUN mkdir /var/www/server/
WORKDIR /var/www/server/
COPY ./server/ ./
RUN npm install

#Front part --------------------
RUN mkdir /var/www/front/
WORKDIR /var/www/front
COPY ./front/ ./
RUN npm install

COPY . .
# Bundle app source