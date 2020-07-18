FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y nodejs npm postgresql-client
RUN npm install -g yarn

RUN mkdir /martian-library
WORKDIR /martian-library
COPY . /martian-library

RUN gem install bundler
RUN yarn
RUN bundle install

COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ['rails', 's', '-b', '0.0.0.0']
