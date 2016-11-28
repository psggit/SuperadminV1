FROM nodesource/jessie:5.3.0

ENV NODE_PATH /usr/lib/node_modules/

WORKDIR /app 

COPY . /app 

ADD package.json .

RUN npm install

#ENTRYPOINT ["npm", "run", "start-dev"]
ENTRYPOINT ["/bin/bash"]
