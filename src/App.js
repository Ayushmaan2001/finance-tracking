import {Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import {useAuthContext} from './hooks/useAuthContext';

function App() {

  const {authIsReady, user} = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Navigate to='/login'/>}></Route>
        <Route path="/login" element={user ? <Navigate to='/'/>:<Login/>}></Route>
        <Route path="/signup" element={user ? <Navigate to='/'/> : <Signup/>}></Route>
      </Routes></>
      )}
    </div>
  );
}

export default App;
