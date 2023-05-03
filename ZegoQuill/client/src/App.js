import React, { useEffect, useState } from 'react';
import './App.css';
import Lobby from './Components/Lobby';
import TextEditor from './Components/TextEditor';
import Zego from './Components/Zego';
import cam from "./doc.png";
function App() {
  const [popup,setpopup]=useState(false);

  function toggleVideo(){
      setpopup(popup?false:true)
  }
  return (
    <div className="App">
      <div className='controls'>
        <div className='control-container'>
          <img src={cam} alt="error" onClick={toggleVideo}></img>
        </div>
      </div>
        <Zego  roomId="123"/>
        <div>
          { popup && <TextEditor roomId="123" />  }
         </div>
      </div>
      
  );
}
export default App;











// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";
// import {v4 as uuidV4} from 'uuid'
  
  {/* <Router>
    <Routes>
      <Route path='/' element={ <Navigate to={`documents/${uuidV4()}`} />} />
      <Route path='/' element={ <Lobby />} />
      <Route path='/Room/:id' element={<Zego />} />
      <Route path='/documents/:id' element={<TextEditor id="nitin" />} />
    </Routes>
  </Router> */}
  
