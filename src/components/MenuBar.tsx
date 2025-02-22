'use client';
import React, { useState } from 'react';
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
`;

const AppleIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('https://www.systemuicons.com/images/icons/fingerprint.svg'); // Thay bằng đường dẫn icon của bạn
  background-size: cover;
  margin-right: 8px;
  cursor: pointer;
`;

// MenuBar component
const MenuBar: React.FC = () => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  return (
    <MenuBarContainer>
      {/* Icon Apple */}
      <AppleIcon />

      {/* Menu File */}
      <MenuItem
        onClick={() => setShowFileMenu(!showFileMenu)}
        onMouseLeave={() => setShowFileMenu(false)}
      >
        File
        {showFileMenu && (
          <DropdownMenu>
            <div>New</div>
            <div>Open</div>
            <div>Save</div>
            <div>Exit</div>
          </DropdownMenu>
        )}
      </MenuItem>

      {/* Menu Edit */}
      <MenuItem
        onClick={() => setShowEditMenu(!showEditMenu)}
        onMouseLeave={() => setShowEditMenu(false)}
      >
        Edit
        {showEditMenu && (
          <DropdownMenu>
            <div>Undo</div>
            <div>Cut</div>
            <div>Copy</div>
            <div>Paste</div>
          </DropdownMenu>
        )}
      </MenuItem>
    </MenuBarContainer>
  );
};

export default MenuBar;