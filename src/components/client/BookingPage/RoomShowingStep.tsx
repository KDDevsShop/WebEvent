import type { GetAllRoomQueries, Room } from '@/services/roomService';
import roomService from '@/services/roomService';
import React from 'react';
import RoomCardList from '../RoomPage/RoomCardList';
import useStepForm from '@/hooks/useStepForm';

type RoomShowingStepProps = {
  props?: React.ReactNode;
};

const RoomShowingStep: React.FC<RoomShowingStepProps> = ({ props }) => {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  const { updateField } = useStepForm();

  console.log(props);

  const onChooseRoom = (room: Room) => {
    console.log('Selected room:', room);
    updateField('room_id', room.room_id.toString());
    // Handle room selection logic here
  };

  const fetchRooms = React.useCallback(async () => {
    try {
      const roomQueries: GetAllRoomQueries = {
        includeImages: true,
      };

      const response = await roomService.getAllRooms(roomQueries);

      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div>
      <h1 className="text-3xl text-primary font-bold mb-8">
        Chọn một phòng cho buổi tiệc
      </h1>
      <RoomCardList
        rooms={rooms}
        onRoomSelect={(room) => console.log(room)}
        onChoose={onChooseRoom}
      />
    </div>
  );
};

export default RoomShowingStep;
