#!/bin/bash

set -e # Immediately exit on fail

npm run bower:install || exit 1

npm run production