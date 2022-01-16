#!/bin/bash

# updates deployment files with new image tag names
SERVICE="$1"	# frontend | corona-backend | country-backend
TAG_NAME="$2"	# e.d registry.guldner.eu/frontend:20220116-1320

#if [[ -z "$SERVICE" ]]; then
#	printf "SERVICE is not provided"
#	exit 1
#fi

#if [[ -z "$TAG_NAME" ]]; then
#	printf "TAG_NAME is not provided"
#	exit 1
#fi

DEPLOYMENT_FILE="./cluster/$SERVICE/resources/deployment.yaml"

cat $DEPLOYMENT_FILE
sed -i '0,/^\([[:space:]]*image: *\).*/s//\1'$TAG_NAME'/;' $DEPLOYMENT_FILE
cat $DEPLOYMENT_FILE
