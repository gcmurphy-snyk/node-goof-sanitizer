FROM node:20.11.1-bullseye
RUN mkdir /app && apt-get update && apt-get install -y sqlite3 libsqlite3-dev 
WORKDIR /app
COPY . .
RUN rm -rf node_modules && npm install
EXPOSE 3000
CMD ["npm", "start"]
