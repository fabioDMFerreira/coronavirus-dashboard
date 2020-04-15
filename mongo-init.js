db.use('coronavirus')
db.createUser({ user: 'root', pwd: 'password', roles: ['readWrite'] });
