// import logo from './logo.svg';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Footer from './components/Footer'
import DoctorPage from './pages/DoctorPage'
import UserPage from './pages/UserPage'
import Admin from './pages/Admin'
import HomePageDoc from './pages/HomePageDoc'
// import Adminpage from './pages/adminpage'

import Loginpage from './pages/Loginpage'
import Header from './components/Header'
// import PrivateRouter from './utils/PrivateRouter'
import { AuthProvider } from './context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Header/>
      <Routes>
 
        
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/footer' element={<Footer/>}/>

        <Route path='/doctorPage' element={<DoctorPage/>}/>
        <Route path='/userPage' element={<UserPage/>}/>
        <Route path='/admin' element={<Admin/>}/>

        <Route path='/' element={<HomePage/>}/>
        <Route path='/homeDoctor' element={<HomePageDoc/>}/>
        
        <Route path='/login' element={<Loginpage/>}/>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;





// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import Profile from './pages/Profile';
// import Register from './pages/Register';
// import Footer from './components/Footer';
// import DoctorPage from './pages/DoctorPage';
// import UserPage from './pages/UserPage';
// import Admin from './pages/Admin';
// import Loginpage from './pages/Loginpage';
// import Header from './components/Header';
// import { AuthProvider } from './context/AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/footer" element={<Footer />} />
//           <Route path="/doctorPage" element={<DoctorPage />} />
//           <Route path="/userPage" element={<UserPage />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/login" element={<Loginpage />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
