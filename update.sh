#!/bin/bash

git pull

cd ./server 

npm run build

cd ../we3

npm run build

pm2 restart iot-server