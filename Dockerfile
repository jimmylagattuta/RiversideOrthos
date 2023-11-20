# Stage 1: Build the React client
FROM node:14 as client-builder

WORKDIR /usr/src/app/client

COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# Stage 2: Build the Rails app
FROM ruby:3.2.2

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

# Install Node.js (includes a JavaScript runtime)
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

COPY . .

# Copy the built React app from the client-builder stage
COPY --from=client-builder /usr/src/app/client/build /usr/src/app/public

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
