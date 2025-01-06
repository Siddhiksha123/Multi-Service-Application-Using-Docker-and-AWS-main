# Dockerfile for user service
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory (this should be the 'user' directory)
COPY ./ .  # Copy everything from the 'user' directory

# Expose the required port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
