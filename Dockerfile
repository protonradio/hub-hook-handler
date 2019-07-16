FROM node:10.16.0-alpine

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
COPY lib lib
COPY index.js .
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
