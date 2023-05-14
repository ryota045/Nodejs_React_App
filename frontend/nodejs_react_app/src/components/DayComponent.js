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
margin-bottom:1.5%;
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
    (props.currentMonth && props.hasTournament) &&
    css`
      &:hover {
        cursor: pointer;
        border-radius: 3px;
        animation: ${fadeIn} 0.5s forwards;
        z-index: ${props.isModalVisible ? 0 : 10};
      }
    `}
`;

//右上の吹き出しのCSS
const NotificationBubble = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #666;
  color: white;
  padding: 2% 4%;
  margin:2%;
  border-radius: 45%; 
  font-size: 0.75em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  &:after { // 吹き出しの尾部分を作成します
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    border-width: 5px;
    border-style: solid;
    border-color: #666 transparent transparent transparent;
    transform: rotate(40deg); // 45度回転
    transform-origin: top right; // 回転の基点を設定
  }
`;

// Day コンポーネントの定義
const DayComponent = ({ date, currentMonth,tournamentList, isModalVisible, onMouseOver, onMouseOut, onClick}) => {
  const tournamentImage = tournamentList.length > 0 ? tournamentList[0].images[0].url : null;
  const hasTournament = tournamentList.length > 0;
  return (
    <Day 
      currentMonth={currentMonth}
      isModalVisible={isModalVisible}
      {...(hasTournament && {onMouseOver: onMouseOver})}
      onMouseOut={onMouseOut}  
      onClick={onClick}
      hasTournament={hasTournament}
    >
      <p>{date}</p>      
      <img src={tournamentImage} style={{ width: '50%', height: 'auto' , borderRadius: '15px'}} />
      {tournamentList.length > 1 && (
        <NotificationBubble>
        
          +{tournamentList.length - 1}
        
        </NotificationBubble>
      )}
    </Day>
  );
};

export default DayComponent;
