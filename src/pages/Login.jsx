import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { authSlice } from '../redux/slices/auth-slice';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { red } from '@mui/material/colors';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.auth.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      dispatch(authSlice.actions.userLogin(true));
      navigate('/');
    }
  }, [dispatch, navigate]);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    if (!email.includes('@')) {
      alert('Вы ввели email-адрес неправильно!');
    } else if (password.length < 6) {
      alert('Пароль должен содержать не менее 6 символов!');
    }
  };

  return (
    <>
      {userLogin ? (
        <Home />
      ) : (
        // ... Остальной код компонента Login
        <LoginMain>
          <section>
            <div className="titleDiv">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2496/2496109.png"
                alt=""
                width={'50px'}
              />
              <h1>Trello</h1>
            </div>

            <form>
              <h3>Вход в Trello</h3>
              <div>
                <TextField
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  label="Укажите адрес электронной почты"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  type="password"
                  variant="outlined"
                  label="Введите пароль"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </div>
              <div>
                <Button
                  sx={{ backgroundColor: '#59ac44' }}
                  fullWidth
                  variant="contained"
                  onClick={onLogin}
                >
                  Продолжить
                </Button>
              </div>
              <hr />
              <div className="variants">
                <p>Не удается войти?</p>
                <p className="text-sm text-white text-center">
                  <NavLink
                    style={{ textDecoration: 'none', color: '#5186dc' }}
                    to="/signup"
                  >
                    Зарегистрировать аккаунт
                  </NavLink>
                </p>
              </div>
            </form>
            <div className="cnfgn">
              <p>Политика конфиденциальности</p>
              <p>Условия использования</p>
            </div>
          </section>
        </LoginMain>
      )}
    </>
  );
};

export default Login;

const LoginMain = styled('div')(() => {
  return {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    '& > section': {
      marginTop: '110px',
      backgroundColor: '#f5f5f5',
      '& > .titleDiv': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '13px',
        '& > h1': {
          fontSize: '4rem',
          color: '#253859',
        },
      },
      '& > form': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 0px 8px 1px rgba(34, 60, 80, 0.2)',
        padding: '40px',
        width: '450px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        '& > h3': {
          textAlign: 'center',
          color: '#7c8088',
        },
        '& .variants > *': {
          textAlign: 'center',
          textDecoration: 'none',
          color: '#5186dc',
        },
      },
      '& .cnfgn': {
        display: 'flex',
        gap: '29px',
        marginTop: '20px',
        color: '#5186dc',
      },
    },
  };
});
