import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { todoActions } from '../../redux/slices/todo-slice';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const TrelloItem = ({ todo }) => {
  const [inputValueCart, setInputValueCart] = useState('');
  const [showInputCart, setShowInputCart] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opisanieArr, setOpisanieArr] = useState([]);
  const [saveOpisanie, setSaveOpisanie] = useState(false);
  const [selectedCartTitle, setSelectedCartTitle] = useState('');
  const [selectedCartOpisanie, setSelectedCartOpisanie] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setShowInputCart(true);
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const addNewCart = () => {
    setShowInputCart(true);
    if (inputValueCart) {
      const newCart = {
        title: inputValueCart,
      };
      dispatch(todoActions.addCartArr({ todoTitle: todo.title, newCart }));
      setInputValueCart('');
      setShowInputCart(false);
    }
  };
  const deleteTodo = (id) => {
    dispatch(todoActions.deleteTodoAction(id));
  };
  const openCartModal = (cartTitle) => {
    setSelectedCartTitle(cartTitle);
    setIsModalOpen(true);
  };
  const closeCartModal = () => {
    return setIsModalOpen(false);
  };
  const SaveOpisanie = () => {
    setOpisanieArr([selectedCartOpisanie]);
    setSaveOpisanie(true);
  };

  return (
    <>
      <Listyle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4>{todo.title}</h4>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/013/278/930/small/more-options-button-dark-mode-glyph-ui-icon-website-circle-elements-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"
                alt="menu"
                width={'25px'}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Добавить карточку...</MenuItem>
              <MenuItem onClick={handleClose}>Копировать список...</MenuItem>
              <MenuItem onClick={() => deleteTodo(todo.id)}>
                Архивировать список
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div>
          <ul>
            {todo.cartArr.map((cart) => {
              return (
                <li
                  className="cartLi"
                  style={{
                    marginTop: '5px',
                    listStyle: 'none',
                    backgroundColor: '#22272b',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    openCartModal(cart.title);
                  }}
                >
                  <p style={{ fontSize: 'small' }}>{cart.title}</p>
                  {isModalOpen ? (
                    <div className="modal">
                      <div className="modal__overlay">
                        <div className="modal__container">
                          <div className="hDiv">
                            <h1>{selectedCartTitle}</h1>
                            <h4>В колонке: {todo.title}</h4>
                          </div>
                          <IconButton
                            onClick={(e) => {
                              closeCartModal();
                              e.stopPropagation();
                            }}
                            color="error"
                            className="closeBtn"
                          >
                            <HighlightOffIcon></HighlightOffIcon>
                          </IconButton>
                        </div>
                        <div className="opisanieDiv">
                          <h2>Описание:</h2>
                          <TextField
                            value={selectedCartOpisanie}
                            onChange={(e) =>
                              setSelectedCartOpisanie(e.target.value)
                            }
                            focused
                            variant="filled"
                            fullWidth
                          />
                          <button onClick={SaveOpisanie}>
                            <h3>Сохранить</h3>
                          </button>

                          {saveOpisanie && (
                            <div className="saveOpisanieDiv">
                              <h6 className="element-with-overflow">
                                {opisanieArr.map((el) => el)}
                              </h6>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="inptuAndButtonDiv">
            {showInputCart && (
              <input
                value={inputValueCart}
                onChange={(e) => setInputValueCart(e.target.value)}
                type="text"
                placeholder="Ввести заголовок для этой карточки"
              />
            )}
            <button className="addBtn" onClick={addNewCart}>
              + Добавить карточку
            </button>
          </div>
        </div>
      </Listyle>
    </>
  );
};

const Listyle = styled.li`
  list-style: none;
  width: 300px;
  background-color: #1e1e28;
  padding: 10px;
  height: min-content;
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  & .inptuAndButtonDiv {
    margin-top: 15px;
  }
  & input {
    background-color: #22272b;
    color: white;
  }
  & .addBtn {
    background-color: #10120420;
    color: #ffffffe8;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #222222;
      color: #d8d8d8e8;
    }
  }
  & .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #00000049;
    & * {
      color: #e7e7e7;
    }
    align-items: center;
    justify-content: center;
    & .modal__overlay {
      position: absolute;
      width: 700px;
      min-height: 600px;
      border-radius: 10px;
      padding: 15px;
      /* background-color: #e7eced; */
      background-color: #323940;
      color: black;
    }
    & .modal__container {
      display: flex;
      justify-content: space-between;
      align-items: start;
    }
    & .closeBtn:hover {
      background-color: #ffffff20;
      transition: 0.4s;
    }
    & .opisanieDiv {
      margin-top: 40px;
      & .saveOpisanieDiv {
        margin-top: 20px;
        background-color: #2d3339;
        min-height: 100px;
        padding: 4px;
        border-radius: 5px;
        & > .element-with-overflow {
          overflow-wrap: break-word;
        }
      }
      & > button {
        background-color: #579dff;
        cursor: pointer;
        margin-top: 5px;
        border: none;
        border-radius: 5px;
        padding: 5px 20px;

        &:hover {
          background-color: #77b0ff;
        }
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
`;
