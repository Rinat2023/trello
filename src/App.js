import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const userLogin = useSelector((state) => state.auth.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [userLogin]);

  return (
    <div>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
