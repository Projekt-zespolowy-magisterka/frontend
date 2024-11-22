# Dockerfile
FROM node:20.7.0-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (the port React app runs on)
EXPOSE 3001

# Start the React app
CMD ["npm", "start"]
