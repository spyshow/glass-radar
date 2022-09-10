# FROM node:14.14-alpine
# RUN npm cache clean --force
# WORKDIR /app
# COPY . .
# RUN npm i
# CMD npm run build
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN export NODE_OPTIONS="--max-old-space-size=122288"
RUN npm run build 
RUN ls -la
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf