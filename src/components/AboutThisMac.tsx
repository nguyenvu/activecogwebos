import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';

// Styled components
const AboutContainer = styled.div`
 background-color: #c0c0c0;
  border: 2px solid black;
  padding: 16px;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
  width: 100%;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.2);
`;

const LaptopIcon = styled.div`
  width: 64px;
  height: 64px;
  background-image: url('/Classic-Mac.png'); // Thay bằng đường dẫn icon laptop của bạn
  background-size: cover;
  margin-bottom: 16px;
`;

const InfoSection = styled.div`
  margin-bottom: 16px;
`;

const InfoLine = styled.div`
  margin-bottom: 8px;
`;

const WindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  height: 24px; /* Chiều cao cố định cho Window Header */
  background-image: linear-gradient(
    to bottom,
    #000 10%,
    transparent 10%,
    transparent 20%,
    #000 20%,
    #000 30%,
    transparent 30%,
    transparent 40%,
    #000 40%,
    #000 50%,
    transparent 50%,
    transparent 60%,
    #000 60%,
    #000 70%,
    transparent 70%,
    transparent 80%,
    #000 80%,
    #000 90%,
    transparent 90%,
    transparent 100%
  );
  background-size: 100% 20px;
  cursor: move; /* Con trỏ kéo 4 hướng */
`;

const WindowTitle = styled.div`
  font-weight: bold;
  padding: 0 16px; /* Padding left và right */
  background-color: #c0c0c0; /* Nền màu trắng */
//   border: 1px solid black;
  text-align: center;
  height: 100%; /* Chiều cao bằng Window Header */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000; /* Màu chữ đen */
`;

const WindowButtons = styled.div`
display: flex;
  gap: 4px;
  height: 100%; /* Chiều cao bằng Window Header */
`;

const WindowButton = styled.div`
  width: 24px;
  height: 100%; /* Chiều cao bằng Window Header */
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:nth-child(1) {
    background-color: #ff5f56; // Close button (red)
  }
  &:nth-child(2) {
    background-color: #ffbd2e; // Minimize button (yellow)
  }
  &:nth-child(3) {
    background-color: #27c93f; // Maximize button (green)
  }
`;

// AboutThisMac component
const AboutThisMac: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Lấy thông tin trình duyệt và hệ điều hành
  const browserInfo = navigator.userAgent;
  const osInfo = navigator.platform;
  const screenResolution = `${window.screen.width}x${window.screen.height}, ${window.screen.colorDepth} bit`;
  const language = navigator.language;

  return (
    <Rnd
      default={{
        x: 200, // Vị trí mặc định theo trục X
        y: 200, // Vị trí mặc định theo trục Y
        width: 300, // Chiều rộng mặc định
        height: 300, // Chiều cao mặc định
        
      }}
      z={10} // Z-index
      minWidth={300} // Chiều rộng tối thiểu
      minHeight={350} // Chiều cao tối thiểu
      bounds="parent" // Giới hạn kéo thả trong phạm vi parent
      enableResizing={{ // Cho phép thay đổi kích thước
        bottom: true,
        bottomRight: true,
        right: true,
      }}
      dragHandleClassName="window-header" // Chỉ kéo thả bằng thanh tiêu đề
    >
      <AboutContainer>
        <WindowHeader className="window-header">
          <WindowTitle>About This Mac</WindowTitle>
          <WindowButtons>
            <WindowButton onClick={onClose} /> {/* Nút Close */}
          </WindowButtons>
        </WindowHeader>
        <LaptopIcon />
        <InfoSection>
          <InfoLine>Author: Vu Nguyen Thai</InfoLine>
          <InfoLine>Email: nguyenvu@live.com</InfoLine>
          <InfoLine>----</InfoLine>
          <InfoLine>Your browser info:</InfoLine>
          <InfoLine>Name: {browserInfo}</InfoLine>
          <InfoLine>OS: {osInfo}</InfoLine>
          <InfoLine>Screen resolution: {screenResolution}</InfoLine>
          <InfoLine>Language: {language}</InfoLine>
        </InfoSection>
      </AboutContainer>
    </Rnd>
  );
};

export default AboutThisMac;