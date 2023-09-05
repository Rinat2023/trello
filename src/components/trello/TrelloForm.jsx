import React, { useState } from 'react';
import { TrelloTodoList } from './TrelloTodoList';
import { TrelloHeader } from './TrelloHeader';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../redux/slices/todo-slice';

// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

// import { styled } from 'styled-components';
import { IconButton, TextField } from '@mui/material';
import styled from '@emotion/styled';

export const TrelloForm = ({handleLogout}) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);

  const todos = useSelector((state) => state.TodoSlice.todos);

  const newItem = {
    title: inputValue,
    cartArr: [],
    id: Date.now(),
  };

  const addTodoHandler = () => {
    if (inputValue) {
      dispatch(todoActions.addTodo(newItem));
    }
    setInputValue('');
    setShowInput(false);
  };

  return (
    <>
      <TrelloHeader handleLogout={handleLogout}></TrelloHeader>
      <div
        style={{
          backgroundColor: '#222f44',
          width: '100%',
          minHeight: '87vh',
          paddingTop: '10px',
          paddingBottom: '15px',
        }}
      >
        <TrelloTodoList></TrelloTodoList>
        <div>
          {showInput && (
            <BoxStyle>
              <TextField
                className="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                id="filled-basic"
                label="Ввести заголововок списка"
                variant="filled"
                size="small"
              />
              <div className="btnDiv">
                <button className="addbtn" onClick={addTodoHandler}>
                  Добавить список
                </button>
                <IconButton
                  onClick={() => setShowInput(false)}
                  className="closebtn"
                  aria-label="delete"
                >
                  <CloseIcon fontSize="small"></CloseIcon>
                </IconButton>
              </div>
            </BoxStyle>
          )}
          {showInput || (
            <ShowButton
              className="showButton"
              onClick={() => setShowInput(true)}
            >
              {todos.length > 0
                ? '+ Добавьте ещё одну колонку'
                : '+ Добавить список'}
            </ShowButton>
          )}
        </div>
      </div>
    </>
  );
};

const BoxStyle = styled('Box')(() => {
  return {
    backgroundColor: '#101204',
    display: 'flex',
    flexDirection: 'column',
    width: '260px',
    padding: '6px',
    marginTop: '30px',
    borderRadius: '5px',
    marginLeft: '30px',
    '& > .input': {
      backgroundColor: '#cacaca',
      marginBottom: '10px',
      borderRadius: '5px',
    },
    '&  .addbtn': {
      backgroundColor: '#579dff',
      padding: '7px 13px',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#6291d3',
      },
    },
    '& > .btnDiv': {
      display: 'flex',
    },
    '&  .closebtn': {
      backgroundColor: '#579dffbb',
      marginLeft: '9px',
      '&:hover': {
        backgroundColor: '#579dff',
      },
    },
  };
});

const ShowButton = styled('button')(() => {
  return {
    marginTop: '30px',
    borderRadius: '5px',
    marginLeft: '30px',
    padding: '15px 30px',
    cursor: 'pointer',
    backgroundColor: '#ffffffa9',
    '&:hover': {
      backgroundColor: '#ffffffba',
    },
  };
});
