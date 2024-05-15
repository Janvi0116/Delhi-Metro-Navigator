import React,{ useState } from 'react';
import { Container, Typography, styled } from '@mui/material';
import StationSelector from './components/StationSelector';
import StationTracker from './components/StationTracker';
import RouteList from './components/RouteList';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
});

const Header = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  color: '#333',
  marginBottom: '2rem',
});

const App = () => {

  const [startingStationId, setStartingStationId] = useState(null);
  const [endingStationId, setEndingStationId] = useState(null);

  const handleStationSelection = (startingStation, endingStation) => {
    setStartingStationId(startingStation);
    setEndingStationId(endingStation);
  };

  return (
    <RootContainer>
      <Header variant="h3">Metro Map</Header>
      <Container maxWidth="md">
        {/* <StationTracker/> */}
        <StationSelector onSubmit={handleStationSelection} />
        {startingStationId && endingStationId && (
          <RouteList
            startingStationId={startingStationId}
            endingStationId={endingStationId}
          />
        )}
      </Container>
    </RootContainer>
  );
};

export default App;