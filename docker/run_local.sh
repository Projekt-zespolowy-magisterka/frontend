#!/bin/sh

# docker image rm stockmaster-backend -f
docker compose -f docker-compose.yml up --build
