import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { RadioBrowserApi } from 'radio-browser-api';
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

const Dropdown = styled.select`
  padding: 4px;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
  margin-bottom: 8px;
`;

// CDPlayer component
const CDPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stations, setStations] = useState<any[]>([]);
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['pop', 'rock', 'jazz', 'classical', 'electronic']);
  const [selectedTag, setSelectedTag] = useState<string>('pop');

  // Fetch danh sách các máy chủ API
  const fetchServers = async () => {
    try {
      const response = await fetch('/api/radio');
      const data = await response.json();
      setServers(data);
      if (data.length > 0) {
        setSelectedServer(data[0].name); // Chọn máy chủ đầu tiên mặc định
      }
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  };

  // Fetch danh sách các đài radio
  const fetchStations = async () => {
    if (!selectedServer) return;

    try {
      const stationsResponse = await fetch(
        `https://${selectedServer}/json/stations/search?limit=10&tag=${selectedTag}`
      );
      const stations = await stationsResponse.json();
      setStations(stations);
    } catch (error) {
      console.error('Error fetching radio stations:', error);
    }
  };

  // Play a station
  const playStation = (url: string | undefined) => {
    if (!url) {
      console.error('URL is undefined');
      return;
    }
    const secureUrl = url.replace('http://', 'https://'); // Đảm bảo URL là HTTPS
    setCurrentStation(secureUrl);
  };

  // Stop playing
  const stopStation = () => {
    setCurrentStation(null);
  };

  // Fetch servers khi component được mount
  useEffect(() => {
    fetchServers();
  }, []);

  // Fetch stations khi selectedServer hoặc selectedTag thay đổi
  useEffect(() => {
    if (selectedServer) {
      fetchStations();
    }
  }, [selectedServer, selectedTag]);

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

        {/* Dropdown chọn máy chủ API */}
        <Dropdown
          value={selectedServer}
          onChange={(e) => setSelectedServer(e.target.value)}
        >
          {servers.map((server, index) => (
            <option key={index} value={server.name}>
              {server.name}
            </option>
          ))}
        </Dropdown>

        {/* Dropdown chọn tag nhạc */}
        <Dropdown
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </Dropdown>

        {/* Danh sách các đài radio */}
        <StationList>
          {stations.map((station, index) => (
            <StationItem key={index} onClick={() => playStation(station.url)}>
              {station.name}
            </StationItem>
          ))}
        </StationList>

        {/* Nút điều khiển */}
        <Controls>
          <Button onClick={fetchStations}>Reload Stations</Button>
          <Button onClick={stopStation} disabled={!currentStation}>
            Stop
          </Button>
        </Controls>

        {/* Phát nhạc */}
        {currentStation ? (
          <audio controls autoPlay>
            <source src={currentStation} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div>No station playing</div>
        )}
      </CDPlayerContainer>
    </Rnd>
  );
};

export default CDPlayer;