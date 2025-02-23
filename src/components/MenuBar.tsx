import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// Styled components
const MenuBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #c0c0c0;
  padding: 4px;
  border-bottom: 2px solid black;
  font-family: 'Chicago', sans-serif;
  font-size: 12px;
`;

const MenuItem = styled.div`
  position: relative;
  margin-right: 16px;
  cursor: pointer;
  padding: 2px 6px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #c0c0c0;
  border: 2px solid black;
  padding: 4px;
  z-index: 10;
  min-width:120px;
`;

const AppleIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('https://www.systemuicons.com/images/icons/lightning_alt.svg'); // Thay bằng đường dẫn icon của bạn
  background-size: cover;
  margin-right: 8px;
  cursor: pointer;
  position: relative; // Thêm position relative để dropdown menu hiển thị đúng vị trí
`;

// MenuBar component
// MenuBar component
const MenuBar: React.FC<{ onOpenCDPlayer: () => void; onOpenAboutThisMac: () => void }> = ({
  onOpenCDPlayer,
  onOpenAboutThisMac,
}) => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showApplicationsMenu, setShowApplicationsMenu] = useState(false);
  const appleIconRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown menu khi click ra ngoài
  const handleClickOutside = (event: MouseEvent) => {
    if (appleIconRef.current && !appleIconRef.current.contains(event.target as Node)) {
      setShowApplicationsMenu(false);
    }
  };

  // Thêm event listener để đóng dropdown menu khi click ra ngoài
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <MenuBarContainer>
      {/* Icon Apple */}
      <AppleIcon
        ref={appleIconRef}
        onClick={() => setShowApplicationsMenu(!showApplicationsMenu)}
      >
        {showApplicationsMenu && (
          <DropdownMenu>
            <div onClick={onOpenAboutThisMac}>About This Mac</div> {/* Mở About This Mac */}
            <div>Applications</div>
            <div onClick={onOpenCDPlayer}>CD Player</div> {/* Mở CD Player */}
          </DropdownMenu>
        )}
      </AppleIcon>

      {/* Menu File và Edit (giữ nguyên như trước) */}
    </MenuBarContainer>
  );
};

export default MenuBar;