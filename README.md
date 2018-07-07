# Saffron Indian Kitchen [![Build Status](https://travis-ci.org/LeungEnterprisesHosting/saffron-indian.svg?branch=master)](https://travis-ci.org/LeungEnterprisesHosting/saffron-indian)

[Saffron Indian Kitchen](http://www.saffronofphilly.com)

## Develop
1. `git clone git@github.com:LeungEnterprisesHosting/saffron-indian`
2. `yarn install`
4. `yarn run dev`,
5. Visit http://localhost:8080/

## Updating Specials
To update the specials, create a new file in the `specials-data/` directory under the current year. For example, to create the specials for January 2022, you should create a file called `january.yml` in the `2022` folder (create that folder if it doesn't exist yet).

Next, copy the previous month's file as a template (in this case, we'd copy `december.yml` from the `2021` folder and then paste in into `january.yml` in the `2022` folder). After that, change the dishes and descriptions to reflect the new month's specials.

Finally, you need to edit the `current.yml` file with the name of the current month and year. (In the case of specials that last two months, such as July/August, simply make sure that the `month` key matches the filename of the specials file). The month that you put here will be displayed on the website, so make sure it's capitalized (when the backend looks for specials file, though, it will ignore case).

Example `current.yml` for July/August 2018 specials:

```yml
year: 2018
month: July-August
```

The above configuration will look for specials in a file called `july-august.yml` in the `2018` folder.

## Deploy
1. `yarn gulp:produce`
