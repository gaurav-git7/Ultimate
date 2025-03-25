import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./Home/project/src/screens/Home/Home";
import { Login } from "./Log/project/src/screens/Login/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
