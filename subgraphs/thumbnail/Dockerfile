from node:17-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY thumbnail.js .

CMD [ "node", "thumbnail.js" ]
