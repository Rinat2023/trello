    import { createSlice } from '@reduxjs/toolkit';
    const initialState = {
      todos: [],
      isModalOpen: false,
    };

    export const TodoSlice = createSlice({
      name: 'TodoSlice',
      initialState,
      reducers: {
        openCartModal: (state, action) => {
          if (action.payload.cart.title === action.payload.titleID) {
            state.isModalOpen = true;
          }
        },
        addTodo: (state, action) => {
          state.todos.push(action.payload);
        },
        addCartArr: (state, action) => {
          state.todos.map((todo) => {
            if (todo.title === action.payload.todoTitle) {
              todo.cartArr.push(action.payload.newCart);
            }
            return todo;
          });
        },
        deleteTodoAction: (state, action) => {
          const filteredTodo = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
          state.todos = filteredTodo;
        },
      },
    });
    export const todoActions = TodoSlice.actions;
