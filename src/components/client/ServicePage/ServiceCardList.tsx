import React, { useState, useEffect } from 'react';

interface Service {
  service_id: number;
  service_name: string;
  description: string;
  setup_time: number;
  is_available: boolean;
  is_active: boolean;
  updated_at: string;
  service_type_id: number;
}

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(service);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {service.service_name}
          </h3>
          <div className="flex gap-2 ml-4">
            {service.is_available && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Available
              </span>
            )}
            {!service.is_active && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Inactive
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Setup: {service.setup_time} min</span>
          </div>

          <button
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardListProps {
  services?: Service[];
  loading?: boolean;
  onServiceSelect?: (service: Service) => void;
  className?: string;
}

const ServiceCardList: React.FC<ServiceCardListProps> = ({
  services = [],
  loading = false,
  onServiceSelect,
  className = '',
}) => {
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    // Filter to show only active and available services for customers
    const activeServices = services.filter(
      (service) => service.is_active && service.is_available,
    );
    setFilteredServices(activeServices);
  }, [services]);

  if (loading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 animate-pulse"
          >
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Services Available
        </h3>
        <p className="text-gray-500">
          There are currently no services available for booking.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.service_id}
          service={service}
          onSelect={onServiceSelect}
        />
      ))}
    </div>
  );
};

export default ServiceCardList;
