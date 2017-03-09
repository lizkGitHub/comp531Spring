#!/bin/bash
PORT=3000

echo "GET /headlines/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/user1
echo ""

echo "PUT /headline"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"user1\", \"headline\":\"This is my(user1) new headline!\" }" http://localhost:${PORT}/headline 
echo ""

echo "GET /headlines/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/user1
echo ""

echo "GET /email/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/user1
echo ""

echo "PUT /email"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"user1\", \"email\":\"user1new@rice.edu\" }" http://localhost:${PORT}/email 
echo ""

echo "GET /email/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/user1
echo ""


echo "GET /zipcode/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/user1
echo ""

echo "PUT /zipcode"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"user1\", \"zipcode\":\"77666\" }" http://localhost:${PORT}/zipcode 
echo ""

echo "GET /zipcode/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/user1
echo ""


echo "GET /avatars/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/user1
echo ""

echo "PUT /avatar"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"user1\", \"avatar\":\"user1.rice.edu\" }" http://localhost:${PORT}/avatar 
echo ""

echo "GET /avatars/user1"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/user1
echo ""

