const express = require('express');
const cors = require('cors');
const app = express();

const cars = [
    { "id": "1", "desc": "Auto A: 3l / 100km", "baseConsumption": 3, "consumptionExponent": 1.009 },
    { "id": "2", "desc": "Auto B: 3.5l / 100km", "baseConsumption": 3.5, "consumptionExponent": 1.009 },
    { "id": "3", "desc": "Auto C: 4l / 100km", "baseConsumption": 4, "consumptionExponent": 1.009 }
];

function countFuelConsumption(carId, distance, speed) {
    const car = cars.find(x => x.id === carId);
    const consumption = Math.round(car.baseConsumption / 100 * (car.consumptionExponent ** speed) * distance * 100) / 100;
    return { "value": consumption, "desc": getConsumptionDesc(consumption) };
}

function getConsumptionDesc(consumption) {
    let consumptionNum = Math.round(Number(consumption.toString().replace('+', '').replace('-', '')) * 100) / 100;
    let consumptionDesc = ' litres per 100km';
    if (consumption.toString().startsWith('+-')) {
        consumptionDesc += ' less';
    } else if (consumption.toString().startsWith('+')) {
        consumptionDesc += ' more';
    }
    return consumptionNum.toString() + consumptionDesc;
}

function countDuration(distance, speed) {
    let duration = distance / speed;
    return { "value": duration, "desc": getDurationDesc(duration) };
}

function getDurationDesc(duration) {
    const durationNum = Number(duration.toString().replace('+', '').replace('-', ''));
    let durationInMin = Math.round(durationNum * 60);
    let mins = durationInMin % 60;
    let hours = (durationInMin - mins) / 60;

    let durationDesc = '';
    if (hours !== 0) {
        durationDesc = hours + (hours === 1 ? ' hour ' : ' hours');
    }
    if (mins !== 0) {
        if (durationDesc.length > 0) {
            durationDesc += ' and ';
        }
        durationDesc += mins + (mins === 1 ? ' minute' : ' minutes');
    }
    if (duration.toString().startsWith('+-')) {
        durationDesc += ' faster';
    } else if (duration.toString().startsWith('+')) {
        durationDesc += ' slower';
    }

    return durationDesc;
}

app.get('/consumption', cors(), (req, res) => {
    res.send(countFuelConsumption(req.query.carid, req.query.distance, req.query.speed));
});

app.get('/consumptiondesc', cors(), (req, res) => {
    res.send(getConsumptionDesc(req.query.consumption).toString());
});

app.get('/duration', cors(), (req, res) => {
    res.send(countDuration(req.query.distance, req.query.speed));
});

app.get('/durationdesc', cors(), (req, res) => {
    res.send(getDurationDesc(req.query.duration).toString());
});

app.get('/cars', cors(), (req, res) => {
    res.send(cars);
});

app.listen(3001, () => {
    console.log('Server listening port 3001');
});

