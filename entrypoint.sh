#!/bin/bash

set -e

cd /martian-library
rm -f tmp/pids/server.pid
rails db:create db:migrate db:seed

exec "$@"
