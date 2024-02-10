// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Pricing from "./components/landing-page/Pricing";
import Landing from "./components/landing-page/Landing";

function App() {
  return (

   <div className="w-full">
     <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/beta-register' element={<Pricing />} />
    </Routes>
   </div>

  );
}

export default App;
