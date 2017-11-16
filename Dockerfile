FROM rails:onbuild

# RUN apt-get update -qq && apt-get install -y build-essential nodejs npm nodejs-legacy vim
# RUN npm install -g phantomjs

# reconfig timezone
# RUN echo "Asia/Beijing" > /etc/timezone  && dpkg-reconfigure -f noninteractive tzdata