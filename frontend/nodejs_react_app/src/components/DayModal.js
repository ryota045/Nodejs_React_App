import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled, { keyframes } from "styled-components";

const fadeIn = (startX, startY) => keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
    transform-origin: ${startX}px ${startY}px;
  }
  100% {
    opacity: 1;
    transform:scale(1);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  padding: 3%;
  background-color: #f8f8f8;
  border-radius: 15px;
  position: relative;
  height: 90%;
  wieth: 100%;
  animation: ${({ startPosition }) => fadeIn(startPosition.x, startPosition.y)}
    1s forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2em;
  background: none;
  color: #333;
  border: none;
  cursor: pointer;
`;

ReactModal.setAppElement("#root");

function DayModal({ day, onClose, animationStartPosition, tournamentList }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    // モーダルの枠を指定する感じ？
    content: {
      position: "relative",
      top: "5%", // 表示するモーダルの中心位置を指定
      left: 0, // 表示するモーダルの中心位置を指定
      right: 0,
      left: 0,
      margin: "auto",
      // transform: "translate(-50%, -50%)",
      width: "75%",
      height: "90%",
      maxHeight:'calc(100vh - 100px)',
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "none",
      padding: "0",
      //boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      outline: "none",
      transition: "all 1s ease",
      overflow: 'auto',
    },
  };

  return (
    <ReactModal
      isOpen={true}
      style={customModalStyles}
      onRequestClose={onClose}
    >
      <ModalContent startPosition={animationStartPosition}>      
          <CloseButton onClick={onClose}>&times;</CloseButton> {/* ここにボタンを追加 */} 
          <h2>Day {day}</h2>
          <h1>Data</h1>
            <ul>
              {tournamentList.map((tournament) => (
                <>
                  <li>{day}</li>
                  <p>{tournament.name}</p>
                  {tournament.images[0] != null ? <img src={tournament.images[0].url} alt="画像の説明" height="200" width="200" /> : <p>No Tournament Image</p>}
                </>
              ))}
            </ul>
      </ModalContent>
    </ReactModal>
  );
}

export default DayModal;
