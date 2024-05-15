import React, { useState, useEffect } from 'react';


const initialStation = 'A' 
const finalStation = 'B'
const route = [{
    stationName:'A',
    distance : 20},{
        stationName:'D',
        distance : 20},{
            stationName:'C',
            distance : 20},{
                stationName:'B',
                distance : 20}]

function getNextStation(route,currentStation){
    let targetIndex = route.findIndex((stationObj) =>  stationObj.stationName === currentStation);
    return route[targetIndex + 1].stationName;
}

function calculateDistanceBetweenStations(route,currentStation){
    let targetStation = route.find((stationObj) =>  stationObj.stationName === currentStation);
    return targetStation.distance;
}

const StationTracker = () => {
  const [currentStation, setCurrentStation] = useState(initialStation);
  const [isTracking, setIsTracking] = useState(false);
  const [lastAcceleration, setLastAcceleration] = useState(null);
  const [distanceTraveled, setDistanceTraveled] = useState(0);

  useEffect(() => {
    const handleMotion = (event) => {
      const { acceleration } = event;
      const currentAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );

      if (lastAcceleration !== null) {
        const delta = currentAcceleration - lastAcceleration;
        setDistanceTraveled((prevDistance) => prevDistance + Math.abs(delta));
      }

      setLastAcceleration(currentAcceleration);
    };

    const handleSuccess = () => {
      window.addEventListener('devicemotion', handleMotion,true);
    };

    const handleError = (error) => {
      console.error('Error accessing device motion:', error);
    };

    if (isTracking) {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(handleSuccess)
          .catch(handleError);
      } else {
        handleSuccess();
      }
    } else {
      window.removeEventListener('devicemotion', handleMotion);
      setLastAcceleration(null);
      setDistanceTraveled(0);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isTracking, lastAcceleration]);

  useEffect(() => {
    const checkStationChange = () => {
      // Calculate the distance between stations based on the chosen route
      const distanceBetweenStations = calculateDistanceBetweenStations(
        route,
        currentStation
      );

      if (distanceTraveled >= distanceBetweenStations) {
        const nextStation = getNextStation(route, currentStation);
        setCurrentStation(nextStation);
        setDistanceTraveled(0);

        if (nextStation === finalStation) {
          setIsTracking(false);
          navigator.vibrate([200, 100, 200]); // Vibrate the device to notify the user
          alert(`You have reached your destination: ${finalStation}`);
        }
      }
    };

    const interval = setInterval(checkStationChange, 1000); // Check every second

    return () => clearInterval(interval);
  }, [currentStation, distanceTraveled, finalStation, route]);

  const startTracking = () => {
    setIsTracking(true);
  };

  return (
    <div>
      <h2>Station Tracker</h2>
      <p>Current Station: {currentStation}</p>
      <p>Distance Traveled: {distanceTraveled.toFixed(2)} meters</p>
      <button onClick={startTracking} disabled={isTracking}>
        Start Tracking
      </button>
    </div>
  );
};

export default StationTracker;