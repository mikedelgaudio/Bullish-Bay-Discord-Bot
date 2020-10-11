FROM node:12
ENV TOKEN = null
ENV API_KEY = null
WORKDIR /dist
COPY . . 
CMD [ "npm run start" ]