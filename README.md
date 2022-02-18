# Compose Upper 

This module allow you to start a docker-compose from a nodejs application. 
Based on multiple projects, return promises and designed to be kiss. 

# Methods 


## runCompose

Duno how to be more explicit :) 

Args : path to docker-compose.yml

## stopCompose

Same here 

Args : path to docker-compose.yml

## getLogs

Well, obvious no ? 

Args : path to docker-compose.yml

## addLabelToDockerCompose

A method to add a specific label for a docker-compose. 
Usefull when used with traefik for example :)

## copyFiles 

A method used to copy files from one directory to another. 
I personnaly used it to have a standalone directory foreach compose I want to start. 

## getARandomName

A method to get a random name 
Can be usefull when used with copyfiles 


# Example workflow 

 - getARandomName
 - copyFiles
 - addLabelToDockerCompose
 - runCompose 
