import React,{useState} from 'react';
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


const StationSelector = ({onSubmit}) => {
  const [startingStation, setStartingStation] = useState(null);
  const [endingStation, setEndingStation] = useState(null);

  const handleStartingStationChange = (event) => {
    setStartingStation(event.target.value);
  };

  const handleEndingStationChange = (event) => {
    setEndingStation(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(startingStation,endingStation)
  };
  return (
    <InputContainer>
      <Input onChange = {handleStartingStationChange}
        select
        label="Starting Station"
        variant="outlined"
      >
        {stationData.map((station) => (
          <MenuItem key={station.id} value={station.id}>
            {station.name}
          </MenuItem>
        ))}
      </Input>
      <Input onChange = {handleEndingStationChange}
        select
        label="Destination Station"
        variant="outlined"
      >
        {stationData.map((station) => (
          <MenuItem key={station.id} value={station.id}>
            {station.name}
          </MenuItem>
        ))}
      </Input>
      <SubmitButton onClick = {handleSubmit} variant="contained" color="primary">
        Submit
      </SubmitButton>
    </InputContainer>
  );
};

export default StationSelector;