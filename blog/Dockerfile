# Use Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json from the root directory
COPY package*.json ./

# Install dependencies from the root package.json
RUN npm install

# Copy the service-specific application code
COPY ./blog .  # Adjust this for each service: ./blog for blog, ./comment for comment

# Expose the port the service will run on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
