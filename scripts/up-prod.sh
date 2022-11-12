#!/bin/bash

ls
pwd

docker-compose -f docker-compose.prod.yml up --build -d