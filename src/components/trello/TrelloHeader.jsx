import React from 'react';
import { styled } from 'styled-components';

export const TrelloHeader = ({ handleLogout }) => {
  return (
    <>
      <HeaderBox>
        <h2>Trello</h2>
        <button onClick={handleLogout}>Log Out</button>
      </HeaderBox>
    </>
  );
};

const HeaderBox = styled.div`
  width: 100%;
  height: 13vh;
  background-color: #1d2125;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  & > h2 {
    color: #9eacba;
    cursor: pointer;
  }
  & > button {
    background: #9eacba;
    padding: 7px 13px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #b2b8be;
    }
  }
`;
