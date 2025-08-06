import React from 'react';
import { defineStepper } from '@stepperize/react';
import GeneralInformationStep from './GeneralInformationStep';
import RoomShowingStep from './RoomShowingStep';
import { Button } from '@/components/ui/button';
import { IoIosArrowForward } from 'react-icons/io';

// type BookingPageContainerProps = {
//   props?: React.ReactNode;
// };

const { useStepper, Scoped, utils, steps } = defineStepper(
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
  {
    id: 'payment',
    title: 'Thanh toán',
    description: 'Thanh toán phí giữ chỗ',
  },
  {
    id: 'confirmation',
    title: 'Xác nhận',
    description: 'Xác nhận thông tin đặt phòng',
  },
  {
    id: 'thank-you',
    title: 'Cảm ơn',
    description: 'Cảm ơn bạn đã đặt phòng',
  },
);

export const BookingPageContainer = () => {
  const stepper = useStepper();

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="container py-12 mx-auto">
      <div className="container flex justify-center items-center gap-4 mb-8">
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
      <div>
        <Scoped>
          {stepper.when('general-information', () => (
            <GeneralInformationStep />
          ))}
          {stepper.when('room-selection', () => (
            <RoomShowingStep />
          ))}
        </Scoped>
      </div>
    </div>
  );
};
