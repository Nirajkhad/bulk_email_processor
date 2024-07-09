FROM node:22

WORKDIR /var/www/bulk_email_processor/backend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","run", "dev:start"]
