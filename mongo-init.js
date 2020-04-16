db = db.getSiblingDB('coronavirus')
db.createUser({ user: 'root', pwd: 'password', roles: ['readWrite'] });
