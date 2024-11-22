import type React from 'react';

interface FooterButtonProps {
  label: string;
  onClick: () => void;
}

const FooterButton: React.FC<FooterButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-full text-lg"
    >
      {label}
    </button>
  );
};

export default FooterButton;