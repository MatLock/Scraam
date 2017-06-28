FROM node:6

# Create app directory
RUN mkdir -p /usr/src/dockerApp
WORKDIR /usr/src/dockerApp

# Install app dependencies
COPY . /usr/src/dockerApp/
RUN npm install 

#install gulp-cli
RUN npm install --global gulp-cli 

RUN gulp build

EXPOSE 3001
CMD [ "npm", "start" ]
