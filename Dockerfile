FROM node:alpine
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install
 
COPY . .
 
EXPOSE 10617
 
CMD ["node", "app.js"]
 