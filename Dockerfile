FROM node:9
RUN mkdir /international-waste-shipments-frontend-training
ADD . /international-waste-shipments-frontend-training
WORKDIR /international-waste-shipments-frontend-training
RUN npm i