import React from 'react';

interface RoomShowingStepProps {
  props?: React.ReactNode;
}

const RoomShowingStep: React.FC<RoomShowingStepProps> = ({ props }) => {
  return (
    <div>
      <h1>Chọn phòng</h1>
      {props}
    </div>
  );
};

export default RoomShowingStep;
