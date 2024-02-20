import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function AppBar(props) {
  return (
    <MuiAppBar elevation={0} position="fixed" {...props}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcom to TTLeague
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
