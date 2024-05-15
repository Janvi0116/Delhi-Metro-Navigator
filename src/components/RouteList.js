import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  styled,
  Collapse,
} from '@mui/material';
import RouteDetails from './RouteDetails';
import { findRoutes } from '../resources/core';

const RouteCard = styled(Card)({
  marginBottom: '1rem',
  cursor: 'pointer',
});

const RouteInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '20px'
});

const StationName = styled(Typography)({
});

const RouteList = ({ startingStationId, endingStationId }) => {
  const [expandedRoute, setExpandedRoute] = useState(null);

  const handleRouteClick = (routeId) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  const routes = findRoutes(startingStationId, endingStationId)
  return (
    <div>
      {routes.map((route,index) => (
        <RouteCard
          key={index}
          onClick={() => handleRouteClick(index)}
        >
          <CardContent>
            <RouteInfo>
              {route.mainStations.map((station, index) => (
                <React.Fragment key={index}>
                  <StationName variant="body1">{station.stationName}</StationName>
                  {index !== route.mainStations.length - 1 && (
                    <Typography variant="body1">
                      ----
                    </Typography>
                  )}
                </React.Fragment>
              ))}
              <Typography variant="body2" style={{ marginLeft: 'auto' }}>
                {route.duration}
              </Typography>
              <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
                {route.numStations} stations
              </Typography>
            </RouteInfo>
            <Collapse in={expandedRoute === index} unmountOnExit>
              <RouteDetails route={route.fullRoute} />
            </Collapse>
          </CardContent>
        </RouteCard>
      ))}
    </div>
  );
};

export default RouteList;