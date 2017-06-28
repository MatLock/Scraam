FROM node:6

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN mkdir -p /usr/src/dockerApp
WORKDIR /usr/src/dockerApp
  
# Install app dependencies
COPY package.json /usr/src/dockerApp/
RUN npm install

#install gulp-cli
RUN npm install --global gulp-cli 

RUN gulp build


RUN gulp build

EXPOSE 3001
CMD [ "npm", "start" ]
