# Use the latest Node.js LTS version
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
