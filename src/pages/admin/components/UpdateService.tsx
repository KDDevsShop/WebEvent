import React, { useState } from 'react';
import serviceService from '../../../services/serviceService';
import type { Service } from '../../../services/serviceService';

interface UpdateServiceProps {
  service: Service;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateService: React.FC<UpdateServiceProps> = ({
  service,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<Service>>({ ...service });
  const [formImages, setFormImages] = useState<File[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === 'checkbox' && 'checked' in e.target) {
      checked = (e.target as HTMLInputElement).checked;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormImages(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      const form = new FormData();

      // Append other form data except some keys
      const excludeKeys = ['service_id', 'updated_at', 'images'];
      Object.entries(formData).forEach(([key, value]) => {
        if (
          !excludeKeys.includes(key) &&
          value !== undefined &&
          value !== null
        ) {
          form.append(key, String(value));
        }
      });

      // Append all selected images with key 'images'
      formImages.forEach((file) => {
        form.append('images', file);
      });

      // Call update API with form data
      await serviceService.updateService(service.service_id, form);

      onSuccess();
      onClose();
    } catch (err: any) {
      setError('Lỗi cập nhật dịch vụ');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border border-gray-200">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
          onClick={onClose}
          title="Đóng"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Cập nhật dịch vụ
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Tên dịch vụ</label>
            <input
              type="text"
              name="service_name"
              value={formData.service_name || ''}
              onChange={handleFormChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleFormChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Thời gian chuẩn bị (phút)
            </label>
            <input
              type="number"
              name="setup_time"
              value={formData.setup_time || 0}
              onChange={handleFormChange}
              className="input input-bordered w-full"
              min={0}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Loại dịch vụ</label>
            <input
              type="text"
              name="service_type_id"
              value={formData.service_type_id || ''}
              onChange={handleFormChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_available"
                checked={!!formData.is_available}
                onChange={handleFormChange}
              />{' '}
              Có sẵn
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={!!formData.is_active}
                onChange={handleFormChange}
              />{' '}
              Hoạt động
            </label>
          </div>
          <div>
            <label className="block font-semibold mb-1">Ảnh dịch vụ</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="input input-bordered w-full"
            />
            {formImages.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {formImages.map((file) => file.name).join(', ')}
              </div>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={formLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formLoading}
            >
              {formLoading ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
