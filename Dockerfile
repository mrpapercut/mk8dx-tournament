FROM node:22.14-alpine

WORKDIR /app

COPY  ./package.json ./package-lock.json ./

RUN npm install

COPY ./tsconfig.json ./webpack.mix.js ./htmltemplate.html ./
COPY ./src ./src
COPY ./fonts ./fonts
COPY ./images ./images

RUN chown -R node:node /app

USER node

RUN npm run mix

CMD ["npm", "run", "server:run"]
