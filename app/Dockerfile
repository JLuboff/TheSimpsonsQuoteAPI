# Step 1: Use a Node.js base image
FROM node:14

# Step 2: Create and set the working directory
WORKDIR /app

# Step 3: Copy the application files into the container
COPY package.json package-lock.json /app/
COPY public /app/public
COPY app.js /app/
COPY init_data /app/init_data


# Step 4: Install application dependencies
RUN npm install && npm install mongodb


# Step 5: Set environment variables (if needed)
# You can provide the values during the container runtime
# using the -e flag or through a .env file
ENV PORT=3000
ENV MONGOUSER=root
ENV MONGOPASS=example
ENV MONGOPORT=27017

# Step 6: Expose the application's port
EXPOSE 3000

# Step 7: Define the command to start the Express server
CMD ["node", "app.js"]
