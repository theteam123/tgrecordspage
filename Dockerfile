FROM node:18-slim

WORKDIR /app

COPY package*.json ./
COPY server ./server
COPY .env ./

RUN npm install --only=production

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server/index.js"]