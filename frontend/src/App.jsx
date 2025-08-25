import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import Updates from './components/Updates';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/updates' element={<Updates />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;