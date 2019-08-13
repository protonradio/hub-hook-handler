FROM node:10.16.2-alpine

RUN apk add --no-cache \
    curl \
    python \
    make \
    git \
    g++ \
    openssh \
    sshpass

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY lib lib
COPY index.js .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
