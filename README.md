This dashboard displays the evolution of total cases, new cases, total deaths and new deaths in every country and every USA region.

[Demo](https://coronavirus-growth.herokuapp.com/)

<img src="assets/oneCountry.png">
<img src="assets/multipleCountries.png">
<img src="assets/pivotTable.png">


## Install

### Docker

* [Docker](https://docs.docker.com/get-docker/)

1. Create `docker.env`
```
MONGO_URI=mongodb://root:password@mongodb:27017/coronavirus
```

2. Start server
```
docker-compose up
```

###  Run in your machine

* [nodejs](https://nodejs.org) >= 12.16.x
* [npm](https://www.npmjs.com/get-npm)
* [mongoDB](https://docs.mongodb.com/manual/installation/)

1. Initialize your mongoDB server

2. Create `.env`
```
MONGO_URI=mongodb://root:password@localhost:27017/coronavirus
```

3. Start server
```
npm run dev
```

## Data Source

* [2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19)
* [Narrativa](https://covid19tracking.narrativa.com/index_en.html)
