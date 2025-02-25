import React from 'react';
import styled from 'styled-components';

// Styled components
const BlueScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgb(36, 14, 161); /* Màu xanh BSOD */
  color: white !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Z-index cao nhất */
  font-family: "Chicago FLF", serif;
  font-size: 24px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  margin-bottom: 32px;
`;

const RestartButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  
  color:rgb(255, 255, 255);
  border: none;
  border-radius: 4px;
  
`;

// BlueScreen component
const BlueScreen: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <BlueScreenContainer>
      {/* Âm thanh lỗi */}
      <audio autoPlay>
        <source src="/erro.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Thông điệp lỗi */}
      <ErrorMessage>
        A fatal error has occurred. Your C: drive has been formatted.
        <br />
        All data has been lost. :(
      </ErrorMessage>

      {/* Nút Restart */}
      <RestartButton onClick={onRestart}>Click here to continue _</RestartButton>
    </BlueScreenContainer>
  );
};

export default BlueScreen;