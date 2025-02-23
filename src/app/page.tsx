'use client';
import React, { useState } from 'react';
import MenuBar from '../components/MenuBar';
import CDPlayer from '../components/CDPlayer';
import AboutThisMac from '../components/AboutThisMac';

const HomePage: React.FC = () => {
  const [showCDPlayer, setShowCDPlayer] = useState(false);
  const [showAboutThisMac, setShowAboutThisMac] = useState(false);

  return (
    <div style={{ backgroundColor: '#808080', minHeight: '100vh', padding: '16px' }}>
      <MenuBar
        onOpenCDPlayer={() => setShowCDPlayer(true)}
        onOpenAboutThisMac={() => setShowAboutThisMac(true)}
      />
      {showCDPlayer && <CDPlayer onClose={() => setShowCDPlayer(false)} />}
      {showAboutThisMac && <AboutThisMac onClose={() => setShowAboutThisMac(false)} />}
    </div>
  );
};

export default HomePage;