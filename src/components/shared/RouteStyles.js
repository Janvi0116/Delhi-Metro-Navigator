import { styled, Typography, Card, CardContent } from '@mui/material';

export const RouteCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  borderRadius: '12px',
  overflow: 'visible',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}));

export const RouteHeader = styled('div')({
  backgroundColor: '#000',
  color: '#fff',
  padding: '16px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  textAlign: 'center',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
});

export const HeaderItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const HeaderValue = styled(Typography)({
  fontSize: '24px',
  fontWeight: '600',
});

export const HeaderLabel = styled(Typography)({
  fontSize: '14px',
  color: '#rgba(255,255,255,0.8)',
});

export const RouteContent = styled(CardContent)({
  padding: '16px',
});

export const StationItem = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '16px',
  position: 'relative',
});

export const StationMarker = styled('div')(({ color }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  minWidth: '24px',
}));

export const StationDot = styled('div')(({ color }) => ({
  width: '12px',
  height: '12px',
  backgroundColor: color || '#666',
  borderRadius: '50%',
}));

export const StationInfo = styled('div')({
  flex: 1,
});

export const StationName = styled(Typography)({
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '4px',
});

export const StationDirection = styled(Typography)({
  fontSize: '14px',
  color: '#666',
});

export const ConnectingLine = styled('div')(({ color }) => ({
  position: 'absolute',
  left: '6px',
  top: '24px',
  width: '2px',
  height: '24px',
  backgroundColor: color || '#666',
})); 