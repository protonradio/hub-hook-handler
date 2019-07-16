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
RUN git clone https://github.com/maccyber/micro-dockerhub-hook.git /app
RUN npm ci

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
