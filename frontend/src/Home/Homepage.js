import Drawers from './Homepage_components/Drawer';
import AppBar from './Homepage_components/AppBar';
import Button from './Homepage_components/Button';
import Leaderboard from '../LeaderBoard';
import DarkModeByDefault from './Homepage_components/Darktheme';

function Homepage() {
  return(
    <div className='app'>
      <DarkModeByDefault />
      <Button />
      <AppBar />
      <div id='idx' style={{alignItems: 'center'}} >
        <Drawers />
        <Leaderboard />
      </div>
    </div>
  )
}

export default Homepage;