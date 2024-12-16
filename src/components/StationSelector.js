import React,{useState, useEffect} from 'react';
import { TextField, Grid, Button, styled, MenuItem } from '@mui/material';
import stationData from '../data/stations';

const InputContainer = styled('div')(({ theme }) => ({
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: '1rem',
  [theme.breakpoints.up('md')]: {
    width: '45%',
    marginRight: '1rem',
    marginBottom: 0,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '10%',
  },
}));


const StationSelector = ({ onSubmit, initialStartStation, initialEndStation }) => {
  const [startingStationId, setStartingStationId] = useState(initialStartStation || '');
  const [endingStationId, setEndingStationId] = useState(initialEndStation || '');

  useEffect(() => {
    // Update local state when initial values change
    setStartingStationId(initialStartStation || '');
    setEndingStationId(initialEndStation || '');
  }, [initialStartStation, initialEndStation]);

  const handleStartingStationChange = (event) => {
    const newStartStation = event.target.value;
    setStartingStationId(newStartStation);
    
    // If same station is selected, clear destination
    if (newStartStation === endingStationId) {
      setEndingStationId('');
    }
  };

  const handleEndingStationChange = (event) => {
    const newEndStation = event.target.value;
    // Don't allow selection if same as starting station
    if (newEndStation === startingStationId) {
      alert("Please select a different station than the starting point");
      return;
    }
    setEndingStationId(newEndStation);
  };

  const handleSubmit = () => {
    if (startingStationId === endingStationId) {
      alert("Please select different stations for start and destination");
      return;
    }
    onSubmit(startingStationId, endingStationId);
  };

  return (
    <InputContainer>
      <Input
        select
        label="Starting Station"
        value={startingStationId}
        onChange={handleStartingStationChange}
        variant="outlined"
      >
        {stationData.map((station) => (
          <MenuItem 
            key={station.id} 
            value={station.id}
          >
            {station.name}
          </MenuItem>
        ))}
      </Input>
      <Input
        select
        label="Destination Station"
        value={endingStationId}
        onChange={handleEndingStationChange}
        variant="outlined"
      >
        {stationData.map((station) => (
          <MenuItem 
            key={station.id} 
            value={station.id}
            disabled={station.id === startingStationId} // Disable same station
          >
            {station.name}
          </MenuItem>
        ))}
      </Input>
      <SubmitButton 
        onClick={handleSubmit} 
        variant="contained" 
        color="primary"
        disabled={!startingStationId || !endingStationId || startingStationId === endingStationId}
      >
        Submit
      </SubmitButton>
    </InputContainer>
  );
};

export default StationSelector;