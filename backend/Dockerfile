FROM node:15

RUN apt-get update && apt-get install -y tzdata

ENV TZ=America/Fortaleza
RUN cp /usr/share/zoneinfo/America/Fortaleza /etc/localtime
RUN echo "America/Fortaleza" > /etc/timezone

RUN mkdir /app

COPY ./app /app

WORKDIR /app
RUN npm ci

RUN npm install -g pm2

EXPOSE 80
