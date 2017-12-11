FROM dk.jingli365.com/jl-run:v2
MAINTAINER Ke Peng <ke.peng@jingli365.com>
COPY package.json /opt/app/
RUN cd /opt/app && rm -rf node_modules && npm install --production && rm -rf ~/.npm
COPY dist/ /opt/app/
WORKDIR /opt/app
CMD node server.js
