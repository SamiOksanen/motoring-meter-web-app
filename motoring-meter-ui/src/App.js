import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    const api = 'http://' + window.location.hostname + ':' + (Number(window.location.port ? window.location.port : 80) + 1);

    const [car, setCar] = useState([{ id: '', desc: '', baseConsumption: 0, consumptionExponent: 0 }]);

    const [ride, setRide] = useState({ carid: '', distance: '', speed1: '', consumption1: '', duration1: { value: '', desc: '' }, duration1vsDuration2: '', speed2: '', consumption2: '', duration2: { value: '', desc: '' }, duration2vsDuration1: '' });

    function getCars() {
        fetch(api + '/cars')
            .then(res => res.json())
            .then(json => {
                setCar(json);
                setRide(prevRide => ({ ...prevRide, carid: json[0].id }));
            });
    }

    useEffect(() => getCars(), []);

    const Add = car.map(Add => Add);

    function updateRide(e) {
        const { name, value } = e.target;
        setRide(prevRide => ({ ...prevRide, [name]: value }));
    }

    function updateDuration(x) {
        if (ride.distance && ride['speed' + x]) {
            fetch(api + '/duration?distance=' + ride.distance + '&speed=' + ride['speed' + x])
                .then(res => res.json())
                .then(json => {
                    setRide(prevRide => ({ ...prevRide, ['duration' + x]: json }));
                });
        }
    }

    function updateDurationVersus(x, y) {
        if (ride.distance && ride['speed' + x] && ride['speed' + y]) {
            const durationVersus = '+' + (Number(ride['duration' + x].value) - Number(ride['duration' + y].value)).toString();
            fetch(api + '/durationdesc?duration=' + encodeURIComponent(durationVersus))
                .then(res => res.text())
                .then(text => {
                    setRide(prevRide => ({ ...prevRide, ['duration' + x + 'vsDuration' + y]: ' which is ' + text }));
                });
        }
    }

    function updateConsumption(x) {
        if (ride.carid && ride.distance && ride['speed' + x]) {
            fetch(api + '/consumption?carid=' + ride.carid + '&distance=' + ride.distance + '&speed=' + ride['speed' + x])
                .then(res => res.text())
                .then(text => {
                    setRide(prevRide => ({ ...prevRide, ['consumption' + x]: text }));
                });
        }
    }

    useEffect(() => {
        updateDuration('1');
        updateConsumption('1');
    }, [ride.distance, ride.speed1]);

    useEffect(() => {
        updateDuration('2');
        updateConsumption('2');
    }, [ride.distance, ride.speed2]);

    useEffect(() => {
        updateDurationVersus('1', '2');
        updateDurationVersus('2', '1');
    }, [ride.duration1, ride.duration2]);

    useEffect(() => {
        updateConsumption('1');
        updateConsumption('2');
    }, [ride.carid]);

    return (
        <div>
            <header>
                <h1>Motoring meter</h1>
            </header>
            <div className="inputDiv">
                < select name="carid"
                    onChange={e => updateRide(e)}
                    className="browser-default custom-select" >
                    {
                        Add.map(car => <option key={car.id} value={car.id}>{car.desc}</option>)
                    }
                </select >
                <p>Distance: <input key="distance" name="distance" onChange={e => updateRide(e)} /></p>
                <p>Speed 1: <input key="speed1" name="speed1" onChange={e => updateRide(e)} /></p>
                <p key="duration1">Duration 1: {ride.duration1.desc} {ride.duration1vsDuration2}</p>
                <p key="consumption1">Consumption 1: {ride.consumption1}</p>
                <p>Speed 2: <input key="speed2" name="speed2" onChange={e => updateRide(e)} /></p>
                <p key="duration2">Duration 2: {ride.duration2.desc} {ride.duration2vsDuration1}</p>
                <p key="consumption2">Consumption 2: {ride.consumption2} </p>
            </div>
            <footer>
                Made by Sami Oksanen
            </footer>
        </div>
    );
}

export default App;
