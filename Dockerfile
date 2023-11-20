# Stage 1: Build the React client
FROM node:18.12.1 as client-builder

WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy the client application files
COPY client .

# Build the React app
RUN npm run build

# Stage 2: Build the Rails app
FROM ruby:2.7

WORKDIR /usr/src/app

# Install Rails dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the Rails application files
COPY . .

# Copy the built React app from the client-builder stage
COPY --from=client-builder /usr/src/app/client/build /usr/src/app/public

# Expose port 3000 for Rails
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
