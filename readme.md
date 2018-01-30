# AeroPay Portal

How to deploy:

There are three modes to deploy the portal: dev, staging and prod.
Take 'dev' mode as example: 
1. run `npm run build-dev` first. This script will build the portal in dev mode.
2. Create a git repo for the dev mode portal. For example, the repo url is: git@github.com:xxxxx/aeropay-aws-dev.git
3. run `git remote set-url aws-dev git@github.com:xxxxx/aeropay-aws-dev.git`
4. run `npm run aws-dev` to push the dist folder only to the aws-dev git repo.
5. Notice That the dist folder contains a server.js and a Dockerfile. The Dockerfile is used for docker hub to build the aws-dev git repo into a docker image automatically. The docker image coantians everything to host the portal, you just need to run it on the AWS ECS service.
6. Go to [docker hub](http://hub.docker.com/) and create an "Automated Build", make sure to link the build to the aws-dev repo that created at step 2.
7. Triger the automated build manually or run  `npm run aws-dev` again with some new updates, then the docker repo will be updated automatically. The name of the docker repo (or docker iamge) should be used in AWS ECS service.
8. Read the AWS ECS docs for how to deploy an image.
9. After successfully deploy everything. Everytime you run `npm run build-dev; npm run aws-dev`, a new docker image will be built in about 5 - 10 mins. After the image is built, stop the ECS task that is currently running with the outdated image, then a new task with the updated image will be created.
10. change the word `dev` to `staging` or `prod` to deploy image in different mode.