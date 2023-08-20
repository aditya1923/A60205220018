import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/details/:train_number' element={<Details/>}/>
    </Routes>
  );
}

export default App;
