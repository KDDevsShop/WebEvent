import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define types
export interface StepFormData {
  event_name: string;
  description: string;
  start_time: string;
  end_time: string;
  event_date: string;
  account_id: string;
  room_id: string;
  event_type_id: string;
  event_services: string[];
}

interface StepFormContextType {
  data: StepFormData;
  updateField: <K extends keyof StepFormData>(
    key: K,
    value: StepFormData[K],
  ) => void;
  resetForm: () => void;
}

// Create context
const StepFormContext = createContext<StepFormContextType | undefined>(
  undefined,
);

// Provider
export const StepFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialData: StepFormData = {
    event_name: '',
    description: '',
    start_time: '',
    end_time: '',
    event_date: '',
    account_id: '0',
    room_id: '0',
    event_type_id: '0',
    event_services: [],
  };

  const [data, setData] = useState<StepFormData>(initialData);

  const updateField = <K extends keyof StepFormData>(
    key: K,
    value: StepFormData[K],
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => setData(initialData);

  return (
    <StepFormContext.Provider value={{ data, updateField, resetForm }}>
      {children}
    </StepFormContext.Provider>
  );
};

// Export context
export default StepFormContext;
