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
    <div className='px-8 py-12 border rounded-xl shadow-lg bg-white cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl'>
      <h1 className='text-center text-3xl font-semibold mb-4 line-clamp-1 text-gray-800'>
        {category.type_name}
      </h1>
      <p className='text-center text-lg text-gray-600 line-clamp-2'>
        {category.description}
      </p>
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
    <div className='container mx-auto py-12 px-4'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800 text-center'>
        Danh mục sự kiện
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 my-12'>
        {eventTypes.map((category) => (
          <EventTypeItem key={category.type_id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default EventTypeList;
