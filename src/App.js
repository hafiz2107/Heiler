
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Signup from './Screen/User/Signup/Signup';
import LoginScreen from './Screen/User/Login/Login';
import OtpInput from './Screen/User/OtpScreen/OtpInput';
import Store from './Redux/Store';
import './App.css';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginScreen person='user'/>} />
          <Route path="/signup" element={<Signup person='user'/>} />
          <Route path='/otp' element={<OtpInput person='user'/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
