// import React from 'react';
import { defineStepper } from '@stepperize/react';
import GeneralInformationStep from './GeneralInformationStep';
import RoomShowingStep from './RoomShowingStep';
import { Button } from '@/components/ui/button';
import { IoIosArrowForward } from 'react-icons/io';
import ServiceShowingStep from './ServiceShowingStep';
import type { StepFormData } from '@/context/StepFormContext';
import useStepForm from '@/hooks/useStepForm';
import eventService from '@/services/eventService';
import { toast } from 'react-toastify';
import PaymentStep from './PaymentStep';

// type BookingPageContainerProps = {
//   props?: React.ReactNode;
// };

const { useStepper, utils, steps } = defineStepper(
  {
    id: 'general-information',
    title: 'Thông tin chung',
    description: 'Cung cấp thông tin cơ bản về sự kiện',
  },
  {
    id: 'room-selection',
    title: 'Lựa chọn phòng',
    description: 'Chọn phòng cho sự kiện của bạn',
  },
  {
    id: 'service-selection',
    title: 'Lựa chọn dịch vụ',
    description:
      'Chọn dịch vụ kèm theo cho sự kiện (có thể chọn nhiều dịch vụ)',
  },
  // {
  //   id: 'review',
  //   title: 'Xác nhận thông tin',
  //   description: 'Xác nhận thông tin sự kiện',
  // },
  {
    id: 'payment',
    title: 'Thanh toán',
    description: 'Thanh toán phí giữ chỗ',
  },
);

const account = localStorage.getItem('account');
const account_id = account !== null ? JSON.parse(account).account_id : 1;

export const BookingPageContainer = () => {
  const stepper = useStepper();

  const { data, resetForm } = useStepForm();

  const currentIndex = utils.getIndex(stepper.current.id);

  const handleCreateEvent = async () => {
    const payload: StepFormData = {
      event_name: data.event_name,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      event_date: data.event_date,
      account_id: account_id,
      room_id: data.room_id,
      event_type_id: data.event_type_id,
      event_services: data.event_services,
    };

    try {
      console.log(payload);
      const response = await eventService.createEvent(payload);

      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : 'Internal server error',
      );
    }
  };

  const handleReset = () => {
    stepper.reset();
    resetForm();
    console.log('Form has been reset', data);
  };

  return (
    <div className="container py-12 mx-auto">
      <div className="container flex justify-center items-center gap-4 mb-24">
        {stepper.all.map((step, index, array) => (
          <div key={step.id} className="flex items-center gap-4">
            <li className="flex items-center gap-4 flex-shrink-0">
              <Button
                type="button"
                role="tab"
                variant={index <= currentIndex ? 'default' : 'secondary'}
                aria-current={
                  stepper.current.id === step.id ? 'step' : undefined
                }
                aria-posinset={index + 1}
                aria-setsize={steps.length}
                aria-selected={stepper.current.id === step.id}
                className="flex size-10 items-center justify-center rounded-full"
                onClick={() => stepper.goTo(step.id)}
              >
                {index + 1}
              </Button>
              <span className="text-sm font-medium">{step.title}</span>
            </li>
            {index < array.length - 1 && <IoIosArrowForward />}
          </div>
        ))}
      </div>
      <div className="space-y-8">
        {stepper.switch({
          'general-information': () => <GeneralInformationStep />,
          'room-selection': () => <RoomShowingStep />,
          'service-selection': () => <ServiceShowingStep />,
          // 'review': () => <ReviewStep />,
          payment: () => <PaymentStep />,
        })}
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Quay lại
            </Button>
            <Button onClick={stepper.next}>Tiếp tục</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleCreateEvent}>Hoàn tất</Button>
          </div>
        )}
      </div>
    </div>
  );
};
