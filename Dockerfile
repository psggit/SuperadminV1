FROM nodesource/jessie:5.3.0
COPY ./ /app 
COPY ./node_modules /usr/lib/node_modules
ENV NODE_PATH /usr/lib/node_modules/
WORKDIR /app 
ENTRYPOINT ["npm", "run", "build"]
ENTRYPOINT ["npm", "run", "start-prod"]
