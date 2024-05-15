const stationData = [
    {
      id: 1,
      name: 'INA',
      connectedStations: {
        'Pink': [2, 3],
        'Yellow': [6]
      }
    },
    {
      id: 2,
      name: 'Sarojni Nagar',
      connectedStations: {
        'Pink': [1, 4],
      }
    },
    {
      id: 3,
      name: 'South Extension',
      connectedStations: {
        'Pink': [1],
      }
    },
    {
      id: 4,
      name: 'Bhikaji Cama Place',
      connectedStations: {
        'Pink': [2,5],
      }
    },
    {
      id: 5,
      name: 'Moti Bagh',
      connectedStations: {
        'Pink': [4],
      }
    },
    {
      id: 6,
      name: 'Jor Bagh',
      connectedStations: {
        'Yellow': [1,7],
      }
    },
    {
      id: 7,
      name: 'Lok Kalyan Marg',
      connectedStations: {
        'Yellow': [6,8],
      }
    },
    {
      id: 8,
      name: 'Udyog Bhawan',
      connectedStations: {
        'Yellow': [7,9],
      }
    },
    {
      id: 9,
      name: 'Central Secretariat',
      connectedStations: {
        'Yellow': [8],
        'Violet' : [10,11]
      }
    },
    {
      id: 10,
      name: 'Janpath',
      connectedStations: {
        'Violet': [9],
      }
    },
    {
      id: 11,
      name: 'Khan Market',
      connectedStations: {
        'Violet': [9,12],
      }
    },
    {
      id: 12,
      name: 'Jln Staidum',
      connectedStations: {
        'Violet': [11],
      }
    },
];
export default stationData;