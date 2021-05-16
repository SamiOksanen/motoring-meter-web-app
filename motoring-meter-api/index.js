const express = require('express');
const cors = require('cors');
const app = express();

const cars = [
    {"id": "1", "desc": "Auto A: 3l / 100km", "baseConsumption": 3, "consumptionExponent": 1.009},
    {"id": "2", "desc": "Auto B: 3.5l / 100km", "baseConsumption": 3.5, "consumptionExponent": 1.009},
    {"id": "3", "desc": "Auto C: 4l / 100km", "baseConsumption": 4, "consumptionExponent": 1.009}
];

function countFuelConsumption(carId, distance, speed) {
    const car = cars.find(x => x.id === carId);
    return (Math.round(car.baseConsumption / 100 * (car.consumptionExponent ** speed) * distance * 100) / 100) + 'l / 100km';
}

function countDuration(distance, speed) {
    let duration = distance / speed;
    return {"value": duration, "desc": getDurationDesc(duration.toString())};
}

function getDurationDesc(duration) {
    let durationDesc = '';
    if (duration.toString().startsWith('+-')) {
        durationDesc = ' faster';
    } else if (duration.startsWith('+')) {
        durationDesc = ' slower';
    }
    const durationNum = Number(duration.replace('+', '').replace('-', ''));
    let durationInMin = durationNum * 60;
    let mins = durationInMin % 60;
    let hours = (durationInMin - mins) / 60;
    return hours + " hours and " + Math.round(mins) + " minutes" + durationDesc;
}

app.get('/consumption', cors(), (req, res) => {
    res.send(countFuelConsumption(req.query.carid, req.query.distance, req.query.speed).toString());
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

