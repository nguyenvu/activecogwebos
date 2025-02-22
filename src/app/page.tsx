import React from 'react';
import MenuBar from '../components/MenuBar';

const HomePage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#808080', minHeight: '100vh', padding: '16px' }}>
      <MenuBar />
      <h1 style={{ fontFamily: 'Chicago, sans-serif', fontSize: '24px', color: 'black' }}>
        Welcome to My Portfolio
      </h1>
      <p style={{ fontFamily: 'Geneva, sans-serif', fontSize: '14px', color: 'black' }}>
        This is my portfolio inspired by Apple System 7.
      </p>
    </div>
  );
};

export default HomePage;