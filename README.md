# Saffron Indian Kitchen [![Build Status](https://travis-ci.org/LeungEnterprisesHosting/saffron-indian.svg?branch=master)](https://travis-ci.org/LeungEnterprisesHosting/saffron-indian)

[Saffron Indian Kitchen](http://www.saffronofphilly.com)

## Develop
1. `git clone git@github.com:LeungEnterprisesHosting/saffron-indian`
2. `yarn install`
3. `yarn bower:install`
4. `yarn gulp:dev`
5. `cd build && python -m http.server`
6. Visit http://localhost:8000/

## Note About Updating Specials
Make sure the Travis build for the new month's specials commits finishes before updating current.yml because if the current.yml build finishes first, the other commit will overwrite it.

## Deploy
1. `yarn gulp:produce`
