# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# We do this first to leverage Docker's caching, so dependencies aren't re-installed on every code change
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build the NestJS application for production
RUN npm run build

# Expose the port your application listens on
# Ensure this matches the port in your main.ts file (e.g., app.listen(3000))
EXPOSE 3002

# Define the command to start the application
CMD ["node", "dist/modules/main/main.js"]