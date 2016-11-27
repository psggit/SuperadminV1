FROM nodesource/jessie:6.3.0
COPY ./ /app 
ENV NODE_PATH /usr/lib/node_modules/
COPY node_modules /usr/lib/node_modules
WORKDIR /app 
# RUN npm install
RUN npm run build
ENTRYPOINT ["npm", "run", "start-prod"]
