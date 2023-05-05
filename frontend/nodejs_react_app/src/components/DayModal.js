import React from "react";
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
  border-radius: 2%;
  position: relative;
  height: 90%;
  wieth: 100%;
  animation: ${({ startPosition }) => fadeIn(startPosition.x, startPosition.y)}
    1s forwards;
`;

ReactModal.setAppElement("#root");

function DayModal({ day, onClose, animationStartPosition }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    // モーダルの枠を指定する感じ？
    content: {
      position: "relative",
      top: "10%", // 表示するモーダルの中心位置を指定
      left: 0, // 表示するモーダルの中心位置を指定
      right: 0,
      left: 0,
      margin: "auto",
      // transform: "translate(-50%, -50%)",
      width: "75%",
      height: "75%",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "none",
      padding: "0",
      //boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      outline: "none",
      transition: "all 1s ease",
    },
  };

  return (
    <ReactModal
      isOpen={true}
      style={customModalStyles}
      onRequestClose={onClose}
    >
      <ModalContent startPosition={animationStartPosition}>
        <h2>Day {day}</h2>
        <p>Information for day {animationStartPosition.y} goes here.</p>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "50vh",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </ModalContent>
    </ReactModal>
  );
}

export default DayModal;
