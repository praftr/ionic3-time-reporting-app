# Ionic 3 time reporting app using CouchDB/PouchDB

This application was originally designed to help me report the time I spent on given tasks.

But it is also a good example to expose how I handle Ionic and CouchDB/PouchDB to make offline working app.

## Installation

Setting up the environment : this will create a CouchDB service on port 5990 with admin:admin credentials.

```
docker-compose up -d
```

Once it's created, you can access `Fauxton` on `localhost:5990/_utils`, log in, and enable CORS.

Once it's done, run

```
npm i
```

## Usage

In Fauxton, create a database called `my_database`, then create a document in it that looks like this one

```json
{
  "type": "user",
  "nom": "Dupond",
  "prenom": "Jean",
  "email": "jean.dupond@edycem.fr",
  "password": "jean.dupond",
  "roles": "ROLE_USER",
  "rgpd": true,
  "metier": "PREFA"
}
```

Then run 

```
ionic lab
```

And log in with email and password

## Disclaimer

As I mention before, this was originally developed for myself only. So please forgive me if the previous steps seem
clumsy and insecure (no env variables, passwords not encrypted). This is only a demontration of using CouchDB/PouchDB
with Ionic.
