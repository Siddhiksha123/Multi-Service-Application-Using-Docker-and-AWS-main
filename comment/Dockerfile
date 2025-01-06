# Dockerfile for comment service
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything from the current context (which is './comment' directory)
COPY ./ .  # This copies files from the 'comment' directory (relative to the Dockerfile location)

# Expose the required port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
