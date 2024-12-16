import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const RouteContainer = styled('div')(({ theme }) => ({
  marginTop: '24px',
  padding: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  gap: '24px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
}));

const StationRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '24px',
  width: '100%',
});

const StationContainer = styled('div')(({ theme, isLastInRow }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  minWidth: '100px',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    minWidth: '80px',
  }
}));

const Circle = styled('div')(({ circleColor }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: circleColor || '#333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontWeight: 600,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: 1,
}));

const Line = styled('div')(({ color, isWrapped }) => ({
  height: '3px',
  backgroundColor: color || '#333',
  position: 'absolute',
  top: '16px',
  left: '50%',
  width: isWrapped ? '50%' : '100%',
  zIndex: 0,
  '&::after': isWrapped ? {
    content: '""',
    position: 'absolute',
    right: '-4px',
    top: '-4px',
    width: '8px',
    height: '8px',
    borderRight: `2px solid ${color}`,
    borderBottom: `2px solid ${color}`,
    transform: 'rotate(45deg)',
  } : {}
}));

const StationName = styled(Typography)(({ theme }) => ({
  marginTop: '8px',
  fontSize: '0.875rem',
  textAlign: 'center',
  maxWidth: '120px',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    textAlign: 'left',
    maxWidth: 'unset',
  }
}));

const RouteDetails = ({ route }) => {
  const STATIONS_PER_ROW = 5; // Adjust this number based on your needs

  const rows = route.reduce((acc, station, index) => {
    const rowIndex = Math.floor(index / STATIONS_PER_ROW);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(station);
    return acc;
  }, []);

  return (
    <RouteContainer>
      {rows.map((row, rowIndex) => (
        <StationRow key={rowIndex}>
          {row.map((station, index) => {
            const globalIndex = rowIndex * STATIONS_PER_ROW + index;
            const isLastInRow = index === row.length - 1;
            const isLastStation = globalIndex === route.length - 1;
            
            return (
              <StationContainer key={index} isLastInRow={isLastInRow}>
                <Circle circleColor={station.color}>
                  {globalIndex + 1}
                </Circle>
                <StationName variant="body2">
                  {station.stationName}
                </StationName>
                {!isLastStation && (
                  <Line 
                    color={station.color} 
                    isWrapped={isLastInRow && !isLastStation}
                  />
                )}
              </StationContainer>
            );
          })}
        </StationRow>
      ))}
    </RouteContainer>
  );
};

export default RouteDetails;