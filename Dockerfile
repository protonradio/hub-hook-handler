FROM node:12.18.3-alpine3.12

RUN apk add --no-cache \
    curl \
    python3 \
    make \
    git \
    g++ \
    openssh \
    sshpass

RUN npm install -g npm

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY lib lib
COPY index.js .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
