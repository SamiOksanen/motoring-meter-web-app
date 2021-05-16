# Motoring meter web app

### About:
This web application let's users to input distance and speed of a ride with a selected car and based on those inputs the application shows how much is the fuel consumption and duration of the ride. This project uses Docker Compose tool/configuration for defining and running two services. 

The first container is the back-end solution of the web app. It has a Node.js Express API which contains multiple different endpoints. I have implemented the actual calculations for fuel consumption and duration in the back-end. Front-end can utilize these implementations via the API endpoints. 

The second container is the user interface of the web app. It is a React app implemented with Hooks. The UI calls the API endpoints when a user inputs car, distance or speed information in the UI. Fuel consumption and duration information on the UI is updated based on the response from the API. 

The project contains two Docker compose configurations, one for development usage with hot reload implementation on both of the services, and one for production deployment which builds optimized version of the react app. Build and start the web app in Docker by running docker command ***docker-compose up -d --build*** for development or ***docker-compose -f docker-compose.prod.yml up -d --build*** for production. Development application can be accessed from port 3000 and production from port 80.

Keywords: React, React Hooks, Node.js, Docker, Docker Compose
