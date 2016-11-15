FROM nodesource/jessie:5.3.0

ENV NODE_PATH /usr/lib/node_modules/

COPY redux-base /app 
WORKDIR /app 
ENTRYPOINT ["npm", "run", "start-prod"]
