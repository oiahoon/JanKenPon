[![Build status](https://ci.appveyor.com/api/projects/status/36b32j4i6c8190ag?svg=true)](https://ci.appveyor.com/project/oiahoon/jankenpon)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/oiahoon/JanKenPon.png?columns=all)](https://waffle.io/oiahoon/JanKenPon?utm_source=badge)
[![CircleCI](https://circleci.com/gh/oiahoon/JanKenPon.svg?style=svg)](https://circleci.com/gh/oiahoon/JanKenPon)
# JanKenPon
『剪刀』、『石頭』、『布』


#development

> 1. git clone `https://github.com/oiahoon/JanKenPon.git`
> 2. cd JanKenPon/
> 3. docker-compose build
> 4. create database & migrate
> 4. cocker-compose up
> 5. [http://localhost/login](http://localhost/login)
> 6. build the assets
>   `docker-compose run app /bin/bash cd html/dev ../jkp build ../release`
> 7. add the crontabs in file `./crontab`