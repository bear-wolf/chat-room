FROM alpine:latest

#Front part --------------------
RUN mkdir /var/www/ && mkdir /var/www/front/
ADD ./ /var/www/front/

CMD['npm','install']
# Bundle app source