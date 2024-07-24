FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build TypeScript files
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/index.js"]
