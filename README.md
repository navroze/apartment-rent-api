Rent API Service 
=======================

A backend API service that can be used to estimate rent for a given apartment defined by apartment size and zip code. The web app supports multi-threading using the **PM2** library in node.js.

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [One step deployment docker](#one-step-deployment-docker)
- [Running CSV Dump](#running-csv-dump)
- [Getting Started on host machine without docker](#getting-started-on-host-machine-without-docker)
- [Project Structure](#project-structure)


Features
--------
- **Multi threading** using PM2 Library
- **One Step Deplyment** using docker
- **JOI schema validation** request schema validation using JOI
- **Logging** using Winston Library
- **Testing** using mocha and assert

Prerequisites
-------------
* Installations for running on host machine
    * Install [Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
    * Install [Node.js LTS](http://nodejs.org)

* Installations for running on docker
    * Install [Docker](https://docs.docker.com)
    * Install [Docker Compose](https://docs.docker.com/compose/install/)


One step deployment docker
---------------
**Note**: Install docker and docker-compose for one step deployment.

```bash
# Get the latest snapshot
https://github.com/navroze/apartment-rent-api.git

# Change to project dir
cd apartment-rent-api

# Deploy on machine
docker-compose up -d

# Populate postgres database
docker ps
docker exec -it <node-conatiner> bash
node csv_dump.js
Terminate the job

# Go to
localhost:3000/graphql

#Sample graphql request
{
  rents(zip_code: 10318, apartment_size: 100) {
    apartment_id
    apartment_size
    zip_code
    rent
    deleted
  }
}
```

Running CSV Dump
-------------

**Note**: The csv_dump will handle insertion and deltas. Please create two databases named `rent_db` and `rent_db_test`.Please refere to `init.sql` for creating the tables and indexes. Change the `user`, `password` and `host` in `config.json`.

To run csv_dump execute the following command `node csv_dump.js` after the node project setup is complete.
There are two options for dumping csv in postgres. A prompt will ask if you want to do the dump immediately. 
1. If *Y* or *y* is selected the dump will be initiated based on the csv file set in `config.json` of the project.
2. Any other option will start a cron job on a weekly basis. The cron will run every Sunday at 00:00


Getting Started on host machine without docker
---------------
**Note**: Please create two databases named `rent_db` and `rent_db_test`. Execute `init.sql` in both the databases before going through the steps below.Set the host, database user and password in the `config.json` file of the project. Perform a CSV dump before starting the web application.

```bash
# Get the latest snapshot
https://github.com/navroze/apartment-rent-api.git

# Change to project dir
cd apartment-rent-api

# Install NPM dependencies
npm install

# Install global dependencies
npm install -g pm2

# Then simply start your app
npm start

# To test your application
npm test

# Go to
localhost:3000/graphql

#Sample graphql request
{
  rents(zip_code: 10318, apartment_size: 100) {
    apartment_id
    apartment_size
    zip_code
    rent
    deleted
  }
}
```
Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **data/**             | All csv dumps              |
| **test/**             | Folder for automated testing using mocha and assert             |
| **resolver/**             | Resolver files for Graphql              |
| **schemas/**             | Graphql schema and csv_field schema             |
| **logging**/rent_api.log                 | Request logged from client                         |                       |
| **.**/config.json                 | Config file for the web application                          |                       |
| ./app.js                      | Main file for starting web application.           |
| ./csv_dump.js                          | Dump csv file set in config.json or schedule to run the job                                     |
| **.**/.gitignore                         | Folder and files ignored by git.                             |
| ./.dockerignore                             | The main application file.                                   |
| ./Dockerfile                       | NPM dependencies.                                            |
| docker-compose.yml                  | Python dependencies for machine learning. |