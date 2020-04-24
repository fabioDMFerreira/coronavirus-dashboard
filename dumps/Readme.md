# Dump
```
mongodump -u root -p password -d coronavirus -c covidcountryregiondatas
```

# Restore
```
mongorestore -h <Host> -u <User> -p <Password> -d coronavirus-growth -c covidcountryregiondatas countryRegionsData/covidcountryregiondatas.bson
```
