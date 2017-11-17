FROM rails:onbuild


RUN apt-get update && apt-get -y install -qq --force-yes cron

COPY crontab /etc/cron.d/crontab
RUN touch /etc/cron.d/crontab && chmod 0644 /etc/cron.d/crontab && touch /var/log/cron.log
RUN service cron start

# RUN apt-get update -qq && apt-get install -y build-essential nodejs npm nodejs-legacy vim
# RUN npm install -g phantomjs

