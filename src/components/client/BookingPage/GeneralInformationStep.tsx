import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EventType } from '@/services/eventType.service';
import eventTypeService from '@/services/eventType.service';
import { toast } from 'react-toastify';

type EventInputs = {
  event_name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  event_date: Date;
  event_type_id: string;
};

type EventTypeSelectProps = {
  eventTypes: EventType[];
  onChange?: (value: string) => void;
};

const GeneralInformationStep = () => {
  const { register, handleSubmit } = useForm<EventInputs>();

  const [eventTypes, setEventTypes] = React.useState<EventType[]>([]);

  const onChangeEventType = (value: string) => {
    console.log('Selected event type ID:', value);
  };

  const onSubmit = (data: EventInputs) => {
    console.log('Submitted data:', data);
    // Handle form submission logic here
  };

  React.useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      const response = await eventTypeService.getAllEventTypes();

      if (response.statusCode !== 200) {
        throw new Error(response.message || 'Failed to fetch event types');
      }

      setEventTypes(response.data);
    } catch (error) {
      console.error('Error fetching event types:', error);
      toast.error(
        error instanceof Error ? error.message : 'Internal server error',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-20 mx-auto">
      <h1 className="text-2xl text-primary font-bold mb-4">
        Thông tin sự kiện
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-24 md:max-w-full sm:max-w-1/2 my-4">
        <div className="flex w-full items-center gap-3">
          <Label htmlFor="event_name" className="flex-1">
            Tên sự kiện
          </Label>
          <Input
            type="text"
            placeholder="Nhập tên sự kiện"
            className="flex-5"
            {...register('event_name')}
          />
        </div>

        <div className="flex w-full items-center gap-3">
          <Label htmlFor="event_name" className="flex-1">
            Loại sự kiện
          </Label>

          <EventTypeSelect
            eventTypes={eventTypes}
            onChange={onChangeEventType}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-24 md:max-w-full sm:max-w-1/2 my-4">
        <div className="flex w-full items-center gap-3">
          <Label htmlFor="event_name" className="flex-1">
            Tên sự kiện
          </Label>
          <Input
            type="text"
            placeholder="Nhập tên sự kiện"
            className="flex-5"
            {...register('event_name')}
          />
        </div>

        <div className="flex w-full items-center gap-3">
          <Label htmlFor="event_name" className="flex-1">
            Tên sự kiện
          </Label>
          <Input
            type="text"
            placeholder="Nhập tên sự kiện"
            className="flex-5"
            {...register('event_name')}
          />
        </div>
      </div>
    </form>
  );
};

const EventTypeSelect: React.FC<EventTypeSelectProps> = ({
  eventTypes,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full flex-5">
        <SelectValue placeholder="Chọn loại sự kiện" />
      </SelectTrigger>
      <SelectContent>
        {eventTypes.length > 0 &&
          eventTypes.map((type) => (
            <SelectItem
              key={`event-type-${type.type_id}`}
              value={type.type_id.toString()}
            >
              {type.type_name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default GeneralInformationStep;
