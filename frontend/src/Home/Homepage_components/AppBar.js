import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from './Button';


function AppBar(props) {
  return (

    <MuiAppBar elevation={8} position="fixed" {...props}>
      <Toolbar>
        <Button />
        <Typography variant="h6" component="div" sx={{ flexGrow: 4 }}>
          Welcome to Boardz
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
