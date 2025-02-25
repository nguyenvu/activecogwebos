'use client';
import React, { useState } from 'react';
import MenuBar from '../components/MenuBar';
import CDPlayer from '../components/CDPlayer';
import AboutThisMac from '../components/AboutThisMac';
import WelcomeWindow from '../components/WelcomeWindow';
import BlueScreen from '../components/BlueScreen'; // Import BlueScreen

const HomePage: React.FC = () => {
  const [showCDPlayer, setShowCDPlayer] = useState(false);
  const [showAboutThisMac, setShowAboutThisMac] = useState(false);
  const [showWelcomeWindow, setShowWelcomeWindow] = useState(true); 
  const [showBlueScreen, setShowBlueScreen] = useState(false); // State cho BlueScreen
  return (
    <div style={{ backgroundColor: '#808080', minHeight: '100vh', padding: '16px' }}>
      <MenuBar
        onOpenCDPlayer={() => setShowCDPlayer(true)}
        onOpenAboutThisMac={() => setShowAboutThisMac(true)}
          onFormatDrive={() => setShowBlueScreen(true)} // Mở BlueScreen khi click Format C: Drive
        onOpenWelcomeWindow={() => setShowWelcomeWindow(true)}
      />
      {showCDPlayer && <CDPlayer onClose={() => setShowCDPlayer(false)} />}
      {showAboutThisMac && <AboutThisMac onClose={() => setShowAboutThisMac(false)} />}
      {showWelcomeWindow && <WelcomeWindow onClose={() => setShowWelcomeWindow(false)} />}
      {showBlueScreen && <BlueScreen onRestart={() => setShowBlueScreen(false)} />} {/* Hiển thị BlueScreen */}
    </div>
  );
};

export default HomePage;