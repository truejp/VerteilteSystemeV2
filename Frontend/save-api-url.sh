#! /bin/sh
if [ -n $API_URL ]; then
    echo ">>>> Using API URL: $API_URL"
    echo $API_URL > /usr/share/nginx/html/api.url
fi
