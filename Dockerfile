FROM nodesource/jessie:5.3.0
COPY ./ /app 
ENV NODE_PATH /usr/lib/node_modules/
WORKDIR /app 
RUN npm install
ENTRYPOINT ["npm", "run", "start-prod"]
