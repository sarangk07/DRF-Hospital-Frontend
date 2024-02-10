// import logo from './logo.svg';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import Loginpage from './pages/Loginpage'
import Header from './components/Header'
import PrivateRouter from './utils/PrivateRouter'
import { AuthProvider } from './context/AuthContext'
 


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Header/>
      <Routes>
        {/* <PrivateRouter path='/' element={<HomePage/>}/> */}
        <Route path="/home" element={<PrivateRouter><HomePage /></PrivateRouter>} />
        <Route path='/login' element={<Loginpage/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
