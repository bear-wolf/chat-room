FROM alpine:latest
FROM node:10

#Server part --------------------
RUN mkdir /var/www/
RUN mkdir /var/www/server/
ADD ./ /var/www/server/

CMD["npm","install"]