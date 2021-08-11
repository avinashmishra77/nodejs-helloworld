FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied where available
COPY package*.json ./

RUN npm install
# If production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["node","index.js"]