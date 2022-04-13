FROM node:12.22.12-alpine3.15

RUN apk add --no-cache \
    curl \
    python3 \
    make \
    git \
    g++ \
    openssh \
    sshpass

RUN npm install -g npm@6

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY lib lib
COPY index.js .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
