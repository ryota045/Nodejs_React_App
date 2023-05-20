import React from 'react';
import styled from 'styled-components';
import Search from './Search'; // Searchコンポーネントをインポート

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const SearchModal = ({ onClose }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Search />
      </ModalContent>
    </ModalBackground>
  );
};

export default SearchModal;