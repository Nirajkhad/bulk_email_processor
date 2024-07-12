# Bulk Email Processor

## Project Overview

Bulk Email Processor is a web application designed to handle bulk email processing using a queue mechanism. It allows users to send emails in bulk, manage email templates, and view logs of sent emails. The application uses Docker for containerization, Node.js for backend development, PostgreSQL for the database, and Sequelize as the ORM.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **MessagingQueue**: Rabitmq
- **Websocket**: socket io
- **ORM**: Sequelize
- **Containerization**: Docker, Docker Compose
- **Frontend** (Optional): React (if frontend is included)

## Project Setup

### Prerequisites

- Docker
- Node.js
- PostgreSQL

### Getting Started

1. **Clone the repository**

   ```bash
   git clone git@github.com:Nirajkhad/bulk_email_processor.git
   cd bulk_email_processor

# Build and run Docker containers
docker-compose up --build

# Access backend container
docker exec -it backend bash

# Inside the backend container, clean npm cache and run migrations
npm cache clean --force
npx sequelize db:migrate
npx sequelize-cli db:seed:all


# API Endpoints
https://documenter.getpostman.com/view/16437456/2sA3e5dTVt33

# Front End

Routes: 
http://localhost:3000/regiter
http://localhost:3000/login

          



