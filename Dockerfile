FROM node:18.18.2-alpine3.18

RUN apk add --no-cache \
    curl \
    python3 \
    make \
    git \
    g++ \
    openssh \
    sshpass

RUN npm install -g npm corepack

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY lib lib
COPY index.js .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
