# Dump
```
mongodump -u root -p password -d coronavirus -c covidcountryregiondatas
```

# Restore
```
mongorestore -h <Host> -u <User> -p <Password> -d coronavirus-growth -c covidcountryregiondatas dump/coronavirus/covidcountryregiondatas.bson
```
