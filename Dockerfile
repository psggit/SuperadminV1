FROM nodesource/jessie:6.3.0
COPY ./ /app 
COPY ./node_modules /usr/lib/node_modules
ENV NODE_PATH /usr/lib/node_modules/
WORKDIR /app 
RUN npm run build
ENTRYPOINT ["npm", "run", "start-prod"]
