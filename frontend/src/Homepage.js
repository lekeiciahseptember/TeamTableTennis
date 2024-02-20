import Drawers from './Homepage_components/Drawer';
import AppBar from './Homepage_components/AppBar';
import Button from './Homepage_components/Button';

function App() {
  return(

    <div className='app'>
      <AppBar />
      <Button />
      <div id='idx' style={{alignItems: 'center'}} >
        <Drawers />
      </div>
    </div>
  )
}

export default App;