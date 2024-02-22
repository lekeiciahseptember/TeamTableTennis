import Homepage from "./Home/Homepage";
import { Routes, Route} from 'react-router-dom';
import Scoreboard from "./scoresheet/Scoreboard";
export default function App() {
  return (
    <div className="App" style={{ backgroundImage: 'url("frontend/src/Home/Homepage_components/images/_83c16536-2bba-467f-bd26-2b3d2572347a.jpeg")', backgroundSize: 'cover', minHeight: '100vh'}}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Scoreboard" element={<Scoreboard />} />
      </Routes>

    </div>
  );
}