import eventTypeService from '@/services/eventType.service';
import React from 'react';

type EventType = {
  type_id: number;
  type_name: string;
  description: string;
};

type ApiResponse<T> = {
  data: T; // This will be EventType[] for getAllEventTypes
  message: string;
  meta?: {
    // meta is optional as it might not always be present for all endpoints
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  status: string;
  statusCode: number;
};

const EventTypeItem = ({ category }: { category: EventType }) => {
  return (
    <div className='px-8 py-16 border rounded-lg shadow-md bg-white'>
      <h1 className='text-center text-3xl'>{category.type_name}</h1>
      <p className='text-center text-xl'>{category.description}</p>
    </div>
  );
};

const EventTypeList = () => {
  const [eventTypes, setEventTypes] = React.useState<EventType[]>([]);

  const fetchEventTypes = async (): Promise<void> => {
    try {
      const response: ApiResponse<EventType[]> =
        await eventTypeService.getAllEventTypes();

      const eventTypesData: EventType[] = response.data;

      setEventTypes(eventTypesData);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  React.useEffect(() => {
    fetchEventTypes();
  });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-4'>
      {eventTypes.map((category) => (
        <EventTypeItem key={category.type_id} category={category} />
      ))}
    </div>
  );
};

export default EventTypeList;
