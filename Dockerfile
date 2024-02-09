# Use the official Node.js Alpine Linux image as a base
FROM node:14-alpine

WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the entire React.js application to the container
COPY ./src ./src
COPY ./.eslintrc.cjs ./
COPY ./.gitignore ./
COPY ./index.html ./
COPY ./postcss.config.js ./
COPY ./README.md ./
COPY ./tailwind.config.js ./
COPY ./vite.config.js ./

# Build the React application
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React application
CMD ["npx","vite"]