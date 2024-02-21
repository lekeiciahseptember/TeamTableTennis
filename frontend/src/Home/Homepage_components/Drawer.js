import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box'


export default function Header () {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey', backgroundColor: '#0261a6', color: 'white' }}>
        <Typography variant="h1" component="h1" gutterBoom>
            Welcome to TTLeague
        </Typography>
    </Box>
    
  );
};
