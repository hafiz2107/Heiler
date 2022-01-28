
import './App.css';
import Signup from './Screen/Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './Screen/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
