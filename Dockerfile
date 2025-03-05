# Step 1: Use a node image to build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all the source files and build the React app
COPY . ./
RUN npm run build

# Step 2: Use a lighter image to serve the React app
FROM nginx:alpine

# Copy the build files from the previous image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server to serve the React app
CMD ["nginx", "-g", "daemon off;"]
