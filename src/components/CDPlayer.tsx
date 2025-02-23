import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RadioBrowserApi } from 'radio-browser-api';
import { Rnd } from 'react-rnd';

// Styled components
const CDPlayerContainer = styled.div`
  background-color: #c0c0c0;
  border: 2px solid black;
  padding: 16px;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StationList = styled.div`
  margin-bottom: 16px;
  max-height: 150px;
  overflow-y: auto;
`;

const StationItem = styled.div`
  padding: 4px;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const Button = styled.button`
  background-color: #c0c0c0;
  border: 2px solid black;
  padding: 4px 8px;
  cursor: pointer;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
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

const SongLabel = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
`;

// CDPlayer component
const CDPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stations, setStations] = useState<any[]>([]);
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Khởi tạo RadioBrowserApi
  const api = new RadioBrowserApi('My Radio App');

  // Fetch radio stations
  const fetchStations = async () => {
    try {
      const stations = await api.searchStations({
        language: 'english', // Lọc theo ngôn ngữ (tùy chọn)
        limit: 10, // Giới hạn số lượng stations
      });
      setStations(stations);
    } catch (error) {
      console.error('Error fetching radio stations:', error);
    }
  };

  // Play a station
  const playStation = (url: string) => {
    setCurrentStation(url);
    setIsPlaying(true);
  };

  // Stop playing
  const stopStation = () => {
    setCurrentStation(null);
    setIsPlaying(false);
  };

  // Fetch stations khi component được mount
  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <Rnd
      default={{
        x: 100, // Vị trí mặc định theo trục X
        y: 100, // Vị trí mặc định theo trục Y
        width: 300, // Chiều rộng mặc định
        height: 400, // Chiều cao mặc định
      }}
      minWidth={300} // Chiều rộng tối thiểu
      minHeight={400} // Chiều cao tối thiểu
      bounds="parent" // Giới hạn kéo thả trong phạm vi parent
      enableResizing={{ // Cho phép thay đổi kích thước
        bottom: true,
        bottomRight: true,
        right: true,
      }}
      dragHandleClassName="window-header" // Chỉ kéo thả bằng thanh tiêu đề
    >
      <CDPlayerContainer>
        <WindowHeader className="window-header">
          <WindowTitle>CD Player</WindowTitle>
          <WindowButtons>
            <WindowButton onClick={onClose} /> {/* Nút Close */}
            <WindowButton onClick={() => alert('Minimize')} /> {/* Nút Minimize */}
            <WindowButton onClick={() => alert('Maximize')} /> {/* Nút Maximize */}
          </WindowButtons>
        </WindowHeader>
        <StationList>
          {stations.map((station) => (
            <StationItem key={station.id} onClick={() => playStation(station.url)}>
              {station.name}
            </StationItem>
          ))}
        </StationList>
        <SongLabel>
          {currentStation ? `Now Playing: ${currentStation}` : 'No station playing'}
        </SongLabel>
        <Controls>
          <Button onClick={fetchStations}>Reload Stations</Button>
          <Button onClick={stopStation} disabled={!currentStation}>
            Stop
          </Button>
        </Controls>
        {currentStation && (
          <audio controls autoPlay>
            <source src={currentStation} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </CDPlayerContainer>
    </Rnd>
  );
};

export default CDPlayer;