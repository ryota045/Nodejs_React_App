import React from 'react';
import styled, { keyframes } from 'styled-components';
import myImage from '../logo.png'; 
import logo from '../logo.svg';
import '../App.css';


const swing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-6deg);
  }
  10% {
    transform: rotate(-12deg);
  }
  
  15% {
    transform: rotate(-18deg);
  }
  
  20% {
    transform: rotate(-24deg);
  }
  25% {
    transform: rotate(-30deg);
  }
  
  30% {
    transform: rotate(-24deg);
  }
  35% {
    transform: rotate(-18deg);
  }
  40% {
    transform: rotate(-12deg);
  }
  45% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(0deg);
  }
  55% {
    transform: rotate(6deg);
  }
  60% {
    transform: rotate(12deg);
  }
  
  65% {
    transform: rotate(18deg);
  }
  
  70% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(24deg);
  }
  
  80% {
    transform: rotate(24deg);
  }
  85% {
    transform: rotate(18deg);
  }
  90% {
    transform: rotate(12deg);
  }
  95% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const Image = styled.img`
  animation: ${swing} 1s infinite;
`;

const Loading = () => {
  return (
    <div className="App">
      <header className="App-header">
      <Image src={myImage} alt="My Image" />
      </header>
    </div>
  );
}

export default Loading;
