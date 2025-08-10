import React from 'react';
import ServiceCardList from '../ServicePage/ServiceCardList';
import type { GetAllServiceQueries, Service } from '@/services/serviceService';
import serviceService from '@/services/serviceService';
import useStepForm from '@/hooks/useStepForm';

interface ServiceShowingStepProps {
  props?: React.ReactNode;
}

const ServiceShowingStep: React.FC<ServiceShowingStepProps> = ({ props }) => {
  const [services, setServices] = React.useState<Service[]>([]);
  const { updateField } = useStepForm();

  console.log(props);

  const onChooseService = (services: Service[]) => {
    console.log('Selected services:', services);
    updateField(
      'event_services',
      services.map((service) => service.service_id.toString()),
    );

    // Handle service selection logic here
  };

  const handleSelectService = (service: Service) => {
    console.log('Service selected:', service);
  };

  const fetchServices = React.useCallback(async () => {
    try {
      const query: GetAllServiceQueries = {
        includeImages: true,
      };
      const response = await serviceService.getAllServices(query);

      setServices(response.data.services || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div>
      <h1 className="text-3xl text-primary font-bold mb-8">
        Chọn các dịch vụ cho buổi tiệc
      </h1>
      <ServiceCardList
        services={services}
        onServiceSelect={handleSelectService}
        onChoose={onChooseService}
      />
    </div>
  );
};

export default ServiceShowingStep;
