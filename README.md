# Bulk Email Processor

Bulk Email Processor is a robust web application designed for efficient bulk email handling using a queue mechanism. It provides functionalities for managing email templates, logging sent emails, and ensuring reliable email delivery.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Messaging Queue**: RabbitMQ
- **Websocket**: Socket.io
- **ORM**: Sequelize
- **Containerization**: Docker, Docker Compose
- **Frontend** (Optional): React (if included)

## Features

- **Email Queue**: Process bulk emails asynchronously to handle large volumes efficiently.
- **Template Management**: Manage email templates for quick and consistent email creation.
- **Logging**: Maintain logs of sent emails for audit and tracking purposes.
- **Containerized Deployment**: Utilize Docker for easy deployment and scaling.
- **API Documentation**: Detailed documentation available via Postman for seamless integration.

## Getting Started

## API Documentation
Explore the API Documentation on Postman for detailed information on available endpoints and usage.
https://documenter.getpostman.com/view/16437456/2sA3e5dTVt

## Frontend 
Registration: http://localhost:3000/register
Login: http://localhost:3000/login

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Mention any contributors or libraries used that deserve acknowledgment.

### Prerequisites

Ensure you have the following installed:
- Docker
- Node.js
- PostgreSQL

### Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:Nirajkhad/bulk_email_processor.git
   cd bulk_email_processor
Build and run Docker containers

2. **Up the containers**
   ```bash
   docker-compose up --build

3. **Access the backend container**
   ```
   docker exec -it backend bash

4.  **Backend setup**
   ```bash
   npm cache clean --force
   npx sequelize db:migrate
   npx sequelize-cli db:seed:all
