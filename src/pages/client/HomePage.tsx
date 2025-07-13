import eventTypeService from '@/services/eventType.service';
import React from 'react';

const HomePage = () => {
  React.useEffect(() => {
    const fetchEventTypes = async () => {
      const response = await eventTypeService.getAllEventTypes();
      console.log(response);
    };

    fetchEventTypes();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
