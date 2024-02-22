// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Pricing from "./components/landing-page/Pricing";
import Landing from "./components/landing-page/Landing";
import Login from "./components/auth/Login";
import SignIn from "./components/auth/SignIn";
import Home_dashboard from "./components/dashboard/home_dashboard";
import Root_layout from "./components/dashboard/Root_layout";
import AiBook from "./components/dashboard/AiBook";
import PracticePaper from "./components/dashboard/PracticePaper";

function App() {
  return (

   <div >
     <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/beta-register' element={<Pricing />} />
      {/* user route */}
      <Route path='/user/log-in' element={<Login />} />
      <Route path='/user/sign-in' element={<SignIn />} />
      <Route element={<Root_layout />} >
        <Route index path="/dashboard" element={<Home_dashboard/>}/>
        <Route path="/ai-book" element={<AiBook/>}/>
        <Route path="/practice-paper" element={<PracticePaper/>}/>
      </Route>
    </Routes>
   </div>

  );
}

export default App;
