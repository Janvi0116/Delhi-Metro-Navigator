import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const RouteContainer = styled('div')(({ theme }) => ({
  marginLeft:'20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '2rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

const StationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  width : '100px',
  height : '80px',
  position: 'relative',
});

const Circle = styled('div')(({ circleColor }) => ({
  width: '40%',
  height: '30px',
  borderRadius: '25%',
  backgroundColor: circleColor || '#333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Line = styled('div')({
  height: '2px',
  backgroundColor: '#333',
  position: 'absolute',
  top: '15px', // Adjusted to center the line with the circle
  left: '40px',
  right: 0,
  width : '60%'
});

const RouteDetails = ({ route }) => {
  return (
    <RouteContainer>
      {route.map((station, index) => (
        <StationContainer key={index}>
          <Circle circleColor={station.color}>
            <Typography variant="body2">
              {index + 1}
            </Typography>
          </Circle>
          <Typography style = {{'width' : '100%',textWrap : 'wrap'}} variant="body2">{station.stationName}</Typography>
          {index !== route.length - 1 && <Line />}
        </StationContainer>
      ))}
    </RouteContainer>
  );
};

export default RouteDetails;