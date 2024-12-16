import React,{ useState } from 'react';
import { Container, Typography, styled } from '@mui/material';
import StationSelector from './components/StationSelector';
import RouteList from './components/RouteList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
} from './components/shared/RouteStyles';

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(4),
}));

const Header = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  color: '#1a237e',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  '& span': {
    color: '#0d47a1',
    fontWeight: 700,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
}));

const BackButton = styled('button')({
  background: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#1a237e',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '8px 0',
  marginBottom: '16px',
});

const Footer = styled('div')({
  textAlign: 'center',
  padding: '20px 0',
  marginTop: 'auto',
  color: '#666',
  '& a': {
    color: '#1a237e',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
});

const LearningsPopup = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  width: '300px',
  visibility: 'hidden',
  opacity: 0,
  transition: 'all 0.3s ease',
  zIndex: 1000,
}));

const LearningsButton = styled('span')({
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    textDecoration: 'underline',
    '& > div': {
      visibility: 'visible',
      opacity: 1,
    }
  }
});

const App = () => {

  const [startingStationId, setStartingStationId] = useState(null);
  const [endingStationId, setEndingStationId] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleStationSelection = (startingStation, endingStation) => {
    if (startingStation === endingStation) {
      alert("Please select different stations for start and destination");
      return;
    }
    setStartingStationId(startingStation);
    setEndingStationId(endingStation);
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleBack = () => {
    setSelectedRoute(null);
  };

  return (
    <RootContainer>
      <Header variant="h3">
        Delhi <span>Metro</span> Navigator
      </Header>
      <ContentContainer maxWidth="md">
        {!selectedRoute && (
          <>
            <StationSelector 
              onSubmit={handleStationSelection}
              initialStartStation={startingStationId}
              initialEndStation={endingStationId}
            />
            {startingStationId && endingStationId && (
              <RouteList
                startingStationId={startingStationId}
                endingStationId={endingStationId}
                onRouteSelect={handleRouteSelect}
              />
            )}
          </>
        )}
        
        {selectedRoute && (
          <>
            <BackButton onClick={handleBack}>
              <ArrowBackIcon /> Back to all routes
            </BackButton>
            <RouteCard elevation={1}>
              <RouteHeader>
                <HeaderItem>
                  <HeaderValue>{selectedRoute.duration || '39'}</HeaderValue>
                  <HeaderLabel>Mins</HeaderLabel>
                </HeaderItem>
                <HeaderItem>
                  <HeaderValue>₹{selectedRoute.fare || '50'}</HeaderValue>
                  <HeaderLabel>Fare</HeaderLabel>
                </HeaderItem>
                <HeaderItem>
                  <HeaderValue>{selectedRoute.fullRoute.length}</HeaderValue>
                  <HeaderLabel>Stops</HeaderLabel>
                </HeaderItem>
                <HeaderItem>
                  <HeaderValue>{selectedRoute.mainStations.length - 1}</HeaderValue>
                  <HeaderLabel>Switch{selectedRoute.mainStations.length - 1 !== 1 ? 'es' : ''}</HeaderLabel>
                </HeaderItem>
              </RouteHeader>
              
              <RouteContent>
                {selectedRoute.fullRoute.map((station, idx) => (
                  <StationItem key={idx}>
                    <StationMarker color={station.color}>
                      <StationDot color={station.color} />
                    </StationMarker>
                    
                    <StationInfo>
                      <StationName>{station.stationName}</StationName>
                      <StationDirection>
                        Towards {idx < selectedRoute.fullRoute.length - 1 ? selectedRoute.fullRoute[idx + 1].stationName : 'End'}
                      </StationDirection>
                    </StationInfo>
                    
                    {idx < selectedRoute.fullRoute.length - 1 && (
                      <ConnectingLine color={station.color} />
                    )}
                  </StationItem>
                ))}
              </RouteContent>
            </RouteCard>
          </>
        )}
      </ContentContainer>
      <Footer>
        <div>
          Made with ❤️ by{' '}
          <a 
            href="https://github.com/janvi0116" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Janvi Arora
          </a>
        </div>
        <div>
          <LearningsButton>
            What I learned from this project
            <LearningsPopup>
              <h4>Technologies & Concepts Used:</h4>
              <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <li>React Hooks (useState, useEffect)</li>
                <li>Material UI Components & Styling</li>
                <li>Styled Components</li>
                <li>Graph Algorithms (for route finding)</li>
                <li>Responsive Design</li>
                <li>Component Architecture</li>
                <li>State Management</li>
                <li>Event Handling</li>
                <li>CSS Grid & Flexbox</li>
                <li>Mobile-First Design</li>
                <li>Code Organization</li>
                <li>Git Version Control</li>
              </ul>
            </LearningsPopup>
          </LearningsButton>
        </div>
      </Footer>
    </RootContainer>
  );
};

export default App;