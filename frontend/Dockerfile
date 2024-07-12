FROM node:22

WORKDIR /var/www/bulk_email_processor/frontend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
