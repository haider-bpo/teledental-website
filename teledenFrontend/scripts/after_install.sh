#!/bin/bash

#_Change_Working_Directory
cd /home/ubuntu

#_Remove_Unused_Code
sudo mv build build.backup
sudo rm -rf build

#Install_node_modules_&_Make_React_Build
#npm install --force
npm run build
