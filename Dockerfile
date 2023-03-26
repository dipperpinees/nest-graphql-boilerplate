FROM node:16

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY package*.json .npmrc prisma ./

RUN pnpm install

COPY . .

RUN pnpm run build:prod

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
