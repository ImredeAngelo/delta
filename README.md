# Deltahouse
This is the source code for the future [deltahouse.no](https://www.deltahouse.no).

![Delta logo](./Banner.jpg)

## Setup
Make sure `yarn` and `python` are installed and set up on your system
1. Clone repo
2. Run `yarn setup` from root directory

## Structure
Static SPA (CSR with prerendered html).
PostCSS used for styling, see webpack config for plugins used.
Microarchitecture /w Docker

## Microservices
 - NGINX: Reverse proxy, serves content (prerendered site, bundle and media)
 - Events: Responsible for handling events; CRUD, tickets, etc. 

## TODO
 - Separate front end (app) and backend (events/credentials) 
 - Set up local server on local network with permanent IP for pipeline-server and dev/stanging servers
 - Generate root CA on said server (public facing) and make local setup script retrieve and trust the CA
 - Control DNS on local server to match the production environment exactly