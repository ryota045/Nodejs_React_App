import React from 'react';
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;        
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.5);
  }
`;

// 既存の Day スタイル
const Day = styled.div`
background-color: #eee; 
text-align: center;
position: relative;
font-weight: bold;
flex-basis: calc(100% / 7 - 2.5%);
height:calc(100% / 6 -5%);
margin-left: 2%;   
margin-top:1.5%;  
border-radius: 8%;  

box-shadow: ${(props) =>
  props.currentMonth
    ? `inset 0 -3em 3em rgba(0,0,0,0.1),
      0 0  0 2px rgb(255,255,255),
      0.3em 0.3em 1em rgba(0,0,0,0.3)`
    : `inset 0 -3em 3em rgba(0,0,0,0.1),
      0.3em 0.3em 1em rgba(0,0,0,0.3)`};
}

  ${(props) =>
    props.currentMonth &&
    css`
      &:hover {
        cursor: pointer;
        border-radius: 3px;
        animation: ${fadeIn} 0.5s forwards;
        z-index: ${props.isModalVisible ? 0 : 10};
      }
    `}
`;

// Day コンポーネントの定義
const DayComponent = ({ date, currentMonth,tournamentList, isModalVisible, onMouseOver, onMouseOut}) => {
  const tournamentImage = tournamentList.length > 0 ? tournamentList[0].images[0].url : null;
  return (
    <Day 
      currentMonth={currentMonth}
      isModalVisible={isModalVisible}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}  
    >
      <p>{date}</p>      
      <img src={tournamentImage} style={{ width: '50%', height: 'auto' , borderRadius: '15px'}} />
      {tournamentList.length > 1 && (
        <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white' }}>
          +{tournamentList.length - 1}
        </div>
      )}
    </Day>
  );
};

export default DayComponent;
