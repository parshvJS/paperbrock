// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/landing-page/landing";
import Pricing from "./components/landing-page/Pricing";

function App() {
  return (

    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/beta-register' element={<Pricing/>}/>
    </Routes>

  );
}

export default App;
