import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from './Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
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
      <br/>
      <Button color ="error" variant="contained" size="lg" onClick={toggleDrawer(true)}>GET STARTED!</Button>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { BackgroundColor: 'navy'} }}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          >
          <List>
            <ListItem button>
              <Link to="/Scoreboard">Scoreboard</Link>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Foosball(coming soon)" />
            </ListItem>
             <ListItem button>
              <ListItemText primary="Tekken(coming soon)" />
            </ListItem>
             <ListItem button>
              <ListItemText primary="Mortal Kombat(coming soon)" />
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
