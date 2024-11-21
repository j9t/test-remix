import React from 'react';
import FooterButton from './FooterButton';

const Footer: React.FC = () => {
  const handleClick = () => {
    window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
  };

  return (
    <footer className="w-full py-4 bg-gray-800 text-center">
      <FooterButton label="Get me out of here" onClick={handleClick} />
    </footer>
  );
};

export default Footer;