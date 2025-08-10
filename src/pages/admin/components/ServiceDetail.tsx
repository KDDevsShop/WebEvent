import React from 'react';
import type { Service } from '../../../services/serviceService';

interface ServiceDetailProps {
  service: Service;
  onClose: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
  // Normalize images array
  const images = Array.isArray(service.images) ? service.images : [];
  console.log(service);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-200">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
          onClick={onClose}
          title="Đóng"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Thông tin dịch vụ
        </h2>
        <div className="space-y-3 mb-6">
          <div>
            <b>ID:</b> {service.service_id}
          </div>
          <div>
            <b>Tên dịch vụ:</b> {service.service_name}
          </div>
          <div>
            <b>Mô tả:</b> {service.description}
          </div>
          <div>
            <b>Thời gian chuẩn bị:</b> {service.setup_time} phút
          </div>
          <div>
            <b>Loại dịch vụ:</b> {service.service_type_id}
          </div>
          <div>
            <b>Trạng thái:</b> {service.is_active ? 'Hoạt động' : 'Ẩn'}
          </div>
        </div>

        {/* Images */}
        {images.length > 0 ? (
          <div className="mb-4">
            <div className="font-semibold mb-2 text-primary">
              Hình ảnh dịch vụ
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border border-gray-200 shadow hover:shadow-lg transition-all bg-gray-50"
                  style={{
                    width: 120,
                    height: 90,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || `Service image ${idx + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 italic mb-2">
            Không có hình ảnh cho dịch vụ này.
          </div>
        )}

        {/* TODO: Show variations and pricing tiers */}

        <div className="flex justify-end mt-6">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
