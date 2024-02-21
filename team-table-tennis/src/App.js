//import logo from './logo.svg';
import { Button } from '@cloudscape-design/components';
import './App.css';
import Addplayermodal from './addplayermodal';
import { useState } from 'react';


function App() {
  const [modalVis, setModalVis] = useState(false)


  
  return (
    <div>
    <Button onClick={() => setModalVis(true)}>Add Player</Button>
    {modalVis && 
    <Addplayermodal closeModal={() => setModalVis(false)} modalVis={modalVis}/> }      
    </div>


  )
}
 

export default App;
