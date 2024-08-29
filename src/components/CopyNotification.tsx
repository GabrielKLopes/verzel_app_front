import React from 'react';

interface CopyNotificationProps {
  visible: boolean;
}

const CopyNotification: React.FC<CopyNotificationProps> = ({ visible }) => {
  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-customInput text-orange-500 px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
      }}
    >
      Link de compartilhamento copiado para a área de transferência!
    </div>
  );
};

export default CopyNotification;
