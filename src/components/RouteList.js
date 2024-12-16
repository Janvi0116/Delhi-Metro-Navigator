import React from 'react';
import {
  RouteCard,
  RouteHeader,
  HeaderItem,
  HeaderValue,
  HeaderLabel,
  RouteContent,
  StationItem,
  StationMarker,
  StationDot,
  StationInfo,
  StationName,
  StationDirection,
  ConnectingLine,
} from './shared/RouteStyles';
import { findRoutes } from '../resources/core';

const RouteList = ({ startingStationId, endingStationId, onRouteSelect }) => {
  const routes = findRoutes(startingStationId, endingStationId);
  
  return (
    <div>
      {routes.map((route, index) => (
        <RouteCard
          key={index}
          onClick={() => onRouteSelect(route)}
          elevation={1}
          sx={{ cursor: 'pointer' }}
        >
          <RouteHeader>
            <HeaderItem>
              <HeaderValue>{route.duration || '39'}</HeaderValue>
              <HeaderLabel>Mins</HeaderLabel>
            </HeaderItem>
            <HeaderItem>
              <HeaderValue>₹{route.fare || '50'}</HeaderValue>
              <HeaderLabel>Fare</HeaderLabel>
            </HeaderItem>
            <HeaderItem>
              <HeaderValue>{route.fullRoute.length}</HeaderValue>
              <HeaderLabel>Stops</HeaderLabel>
            </HeaderItem>
            <HeaderItem>
              <HeaderValue>{route.mainStations.length - 1}</HeaderValue>
              <HeaderLabel>Switch{route.mainStations.length - 1 !== 1 ? 'es' : ''}</HeaderLabel>
            </HeaderItem>
          </RouteHeader>
          
          <RouteContent>
            {route.mainStations.map((station, idx) => (
              <StationItem key={idx}>
                <StationMarker color={station.color}>
                  <StationDot color={station.color} />
                </StationMarker>
                
                <StationInfo>
                  <StationName>{station.stationName}</StationName>
                  <StationDirection>
                    Towards {idx < route.mainStations.length - 1 ? route.mainStations[idx + 1].stationName : 'End'}
                  </StationDirection>
                </StationInfo>
                
                {idx < route.mainStations.length - 1 && (
                  <ConnectingLine color={station.color} />
                )}
              </StationItem>
            ))}
          </RouteContent>
        </RouteCard>
      ))}
    </div>
  );
};

export default RouteList;