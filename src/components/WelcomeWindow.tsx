import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';

// Styled components
const WelcomeContainer = styled.div`
  background-color: #c0c0c0;
  border: 2px solid black;
  padding: 16px;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.2);
`;

const WelcomeImage = styled.img`
  width: 640px;
  height: 359px;
  margin-bottom: 16px;
`;

const WelcomeTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align:left;
`;

const WelcomeText = styled.p`
  font-size: 10px;
  line-height: 1.5;
  text-align:left;
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

// WelcomeWindow component
const WelcomeWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Rnd
      default={{
        x: 200, // Vị trí mặc định theo trục X
        y: 200, // Vị trí mặc định theo trục Y
        width: 700, // Chiều rộng mặc định
        height: 500, // Chiều cao mặc định
      }}
      minWidth={700} // Chiều rộng tối thiểu
      minHeight={500} // Chiều cao tối thiểu
      bounds="parent" // Giới hạn kéo thả trong phạm vi parent
      enableResizing={{ // Cho phép thay đổi kích thước
        bottom: true,
        bottomRight: true,
        right: true,
      }}
      dragHandleClassName="window-header" // Chỉ kéo thả bằng thanh tiêu đề
    >
      <WelcomeContainer>
        <WindowHeader className="window-header">
          {/* Nút Close bên trái */}
          <WindowButtons>
            <WindowButton onClick={onClose} /> {/* Nút Close */}
          </WindowButtons>

          {/* Tiêu đề cửa sổ */}
          <WindowTitle>Welcome</WindowTitle>

          {/* Nút Minimize/Maximize bên phải */}
          <WindowButtons>
            <WindowButton onClick={() => alert('Minimize')} /> {/* Nút Minimize */}
            <WindowButton onClick={() => alert('Maximize')} /> {/* Nút Maximize */}
          </WindowButtons>
        </WindowHeader>

        {/* Hình ảnh */}
        <WelcomeImage
          src="/welcome-image.jpg" // Thay bằng đường dẫn hình ảnh của bạn
          alt="Welcome Image"
        />

        {/* Tiêu đề */}
        <WelcomeTitle>
          I’m Vu Nguyen Thai, a front-end developer and product designer currently based in Oslo, Norway.
        </WelcomeTitle>

        {/* Đoạn văn bản */}
        <WelcomeText>
          I’m working at Pixii AS, and I have a passion for front-end development and using Python for data processing. I’m also a big fan of macOS and Debian.
          <br /><br />
          In my free time, I enjoy playing retro games, collecting old computers, hiking in the woods, cycling, archery, cooking and camping outdoors, and fishing for mackerel.
        </WelcomeText>
      </WelcomeContainer>
    </Rnd>
  );
};

export default WelcomeWindow;