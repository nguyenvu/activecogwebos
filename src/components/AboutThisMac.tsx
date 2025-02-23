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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LaptopIcon = styled.div`
  width: 64px;
  height: 64px;
  background-image: url('/laptop-icon.png'); // Thay bằng đường dẫn icon laptop của bạn
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
`;

const WindowTitle = styled.div`
  font-weight: bold;
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const WindowButton = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid black;
  cursor: pointer;
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
      minWidth={300} // Chiều rộng tối thiểu
      minHeight={300} // Chiều cao tối thiểu
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