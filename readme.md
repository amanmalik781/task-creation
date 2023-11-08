command to create docker netwrok so that the 3 services can communicate with each other:
docker network create my-network

command to run image 1:
docker run -d -p 3000:3000 --network my-network --name task-creation-image task-creation

command to run image 2:
docker run -d -p 3001:3001 --network my-network --name task-retrieval-image task-retrieval

command to run image 3:
docker run -d -p 3002:3002 --network my-network --name task-update-delete-image task-update-delete

command to run docker command on mac in case the mac does not recognise the command:
alias docker="/Applications/Docker.app/Contents/Resources/bin/docker"