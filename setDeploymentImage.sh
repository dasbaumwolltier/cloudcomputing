#!/bin/sh

# updates deployment files with new image tag names
SERVICE="$1"	# frontend | corona-backend | country-backend
TAG_NAME="$2"	# e.d registry.guldner.eu/frontend:20220116-132
DEPLOYMENT_FILE="./cluster/$SERVICE/resources/deployment.yaml"

cat $DEPLOYMENT_FILE
sed -ie "s/^\(\s*image\s*:\s*\).*/\1${TAG_NAME}/" $DEPLOYMENT_FILE
cat $DEPLOYMENT_FILE
