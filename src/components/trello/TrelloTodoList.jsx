import React from 'react';
import { TrelloItem } from './TrelloItem';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

export const TrelloTodoList = () => {
  const todos = useSelector((state) => state.TodoSlice.todos);
  return (
    <>
      <UlBox>
        {todos.map((todo) => {
          return <TrelloItem todo={todo} todos={todos}></TrelloItem>;
        })}
      </UlBox>
    </>
  );
};

const UlBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 9px;
  row-gap: 7px;
  margin-left: 9px;
`;
