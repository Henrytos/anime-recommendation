FROM node  

WORKDIR /home/app 

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 8080