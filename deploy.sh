#!/bin/bash

set -e # Immediately exit on fail

npm run bower:install || exit 1

rm -rf build || exit 1 # exit if this fails
rm -rf dist || exit 1 # exit if this fails

npm run gulp:build || exit 1
npm run gulp:produce || exit 1

cd dist
git init

git config user.name "Travis CI"
# change this to your email
git config user.email "hello@leungenterprises.com"

git add .
git commit -m "Github Pages Deploy"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

# Based on https://gist.github.com/domenic/ec8b0fc8ab45f39403dd