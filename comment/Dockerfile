# Use a Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory (which is the 'comment' directory in this case)
COPY ./comment .  # This will copy everything from the 'comment' directory

# Expose the required port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
