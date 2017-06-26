FROM node:6


# Create app directory
RUN mkdir -p /usr/src/dockerApp
WORKDIR /usr/src/dockerApp

# Install app dependencies
COPY package.json /usr/src/dockerApp/
RUN npm install

#install gulp-cli
RUN npm install --global gulp-cli

# Bundle app source
COPY . /usr/src/dockerApp

RUN gulp build

EXPOSE 3001
CMD [ "npm", "start" ]
