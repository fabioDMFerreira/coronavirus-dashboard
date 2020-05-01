# Dump
```
mongodump -u root -p password -d coronavirus -c covidcountryregiondatas -o region

mongodump -u root -p password -d coronavirus -c covidcountrydatas -o country
```

# Restore
```
mongorestore -h <Host> -u <User> -p <Password> -d coronavirus-growth -c covidcountryregiondatas region/coronavirus/covidcountryregiondatas.bson --drop

mongorestore -h <Host> -u <User> -p <Password> -d coronavirus-growth -c covidcountryregiondatas country/coronavirus/covidcountrydatas.bson --drop
```
