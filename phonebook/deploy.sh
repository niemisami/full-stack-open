#!/bin/sh
npm run build 
rm -rf ../../full-stack-open-phonebook-backend/build
cp -r ../../full-stack-open-phonebook-backend/
