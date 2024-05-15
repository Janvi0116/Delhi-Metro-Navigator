import stationData from "../data/stations"

const getStationById = (id) => {
    return stationData.find((station) => station.id === id);
  };

const findRoutes = (startingStationId, endingStationId) => {
    const startingStation = getStationById(startingStationId);
    const endingStation = getStationById(endingStationId);
  
    if (!startingStation || !endingStation) {
      return [];
    }
  
    const visitedStations = new Set();
    const queue = [[startingStation]];
    const routes = [];
  
    while (queue.length > 0) {
      const currentRoute = queue.shift();
      const lastStation = currentRoute[currentRoute.length - 1];
  
      if (lastStation.id === endingStationId) {
        const formattedRoute = formatRoute(currentRoute);
        routes.push(formattedRoute);
      } else {
        visitedStations.add(lastStation.id);
  
        Object.entries(lastStation.connectedStations).forEach(([color, connectedStationIds]) => {
          connectedStationIds.forEach((connectedStationId) => {
            if (!visitedStations.has(connectedStationId)) {
              const connectedStation = getStationById(connectedStationId);
              const newRoute = [...currentRoute, connectedStation];
              queue.push(newRoute);
            }
          });
        });
      }
    }
  
    return routes;
  };

const findCommonColours = function(stationA,stationB){
  let stationAColours = Object.keys(stationA.connectedStations);
  let stationBColours = Object.keys(stationB.connectedStations);
  let commonColour = stationAColours.find((colour) => stationBColours.includes(colour));
  return commonColour;
}

const formatRoute = (route) => {
  if(route.length < 2)
    return ;

  let fullRoute = [];
  route.forEach((station,index) => {
    if(index === route.length - 1){
      fullRoute.push({
        stationName: station.name,
        color: fullRoute[index - 1].color, // Assuming one color per station
      })
    }
    else{
      fullRoute.push({
        stationName: station.name,
        color: findCommonColours(station,route[index + 1]), // Assuming one color per station
      })
    }
  })

  const mainStations = [];
  let prevColor = null;

  for (let i = 0; i < fullRoute.length; i++) {
    const { stationName, color } = fullRoute[i];

    if (i === 0 || color !== prevColor) {
      mainStations.push({ stationName, color });
      prevColor = color;
    } else if (i === fullRoute.length - 1) {
      mainStations.push({ stationName, color });
    }
  }

  return {
    fullRoute,
    mainStations,
  };
};

export {
    findRoutes
}