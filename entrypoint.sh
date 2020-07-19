#!/bin/bash

set -e

rm -f /martian-library/tmp/pids/server.pid

exec "$@"
