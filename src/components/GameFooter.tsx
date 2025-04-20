import React from 'react';
import { Twitter } from "lucide-react";

interface GameFooterProps {
  gameWon: boolean;
  revealed: boolean;
  onTwitterShare: () => void;
}

const GameFooter: React.FC<GameFooterProps> = ({
  gameWon,
  revealed,
  onTwitterShare
}) => {
  return (
    <div className="flex justify-center mt-4">
      {gameWon && (
        <button
          onClick={onTwitterShare}
          className="text-gray-500 hover:text-blue-400 transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default GameFooter; 