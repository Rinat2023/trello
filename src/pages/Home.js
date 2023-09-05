import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { TrelloForm } from '../components/trello/TrelloForm';
import { useDispatch } from 'react-redux';
import { authSlice } from '../redux/slices/auth-slice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
        localStorage.clear();
        dispatch(authSlice.actions.userLogin(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <>
      <div>
        <TrelloForm handleLogout={handleLogout}></TrelloForm>
      </div>
    </>
  );
};

export default Home;
