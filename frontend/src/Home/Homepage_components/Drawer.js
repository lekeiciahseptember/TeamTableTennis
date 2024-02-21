import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from './Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Drawers() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div style={{ display:'flex', justifyContent: 'center', marginTop: 'auto'}}>
      <Button color ="error" variant="contained" size="lg" onClick={toggleDrawer(true)}>GET STARTED!</Button>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { BackgroundColor: 'navy'} }}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Play" />
            </ListItem>
            
            <ListItem button>
              <ListItemText primary="Add player" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Betting Section(Coming soon)" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Drawers;
