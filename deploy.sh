#!/bin/bash

set -e # Immediately exit on fail

npm run bower:install || exit 1

rm -rf build || exit 1 # exit if this fails
rm -rf dist || exit 1 # exit if this fails

npm run gulp:build || exit 1
npm run gulp:produce || exit 1