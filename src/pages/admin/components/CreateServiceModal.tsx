import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import serviceTypeService from '@/services/serviceTypeService';
import serviceService from '@/services/serviceService';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

interface CreateServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    service_name: '',
    description: '',
    setup_time: 0,
    is_available: true,
    is_active: true,
    service_type_id: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [serviceTypesLoading, setServiceTypesLoading] = useState(false);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      setServiceTypesLoading(true);
      try {
        const res = await serviceTypeService.getAllServiceTypes({
          is_active: true,
        });
        setServiceTypes(res.data?.serviceTypes || []);
      } catch (err) {
        setServiceTypes([]);
      } finally {
        setServiceTypesLoading(false);
      }
    };
    fetchServiceTypes();
  }, []);

  // Service field change
  const handleServiceChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Service boolean change
  const handleServiceSwitch = (name: string, value: boolean) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as any);
      });

      images.forEach((img) => {
        formData.append('image', img); // use 'image' multiple times
      });

      await serviceService.createService(formData);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError('Lỗi tạo dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tạo dịch vụ mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_name">Tên dịch vụ</Label>
              <Input
                name="service_name"
                value={form.service_name}
                onChange={handleServiceChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="service_type_id">Loại dịch vụ</Label>
              <select
                name="service_type_id"
                value={form.service_type_id}
                onChange={handleServiceChange}
                className="input input-bordered w-full"
                required
              >
                <option value="">Chọn loại dịch vụ</option>
                {serviceTypes.map((type) => (
                  <option
                    key={type.service_type_id}
                    value={type.service_type_id}
                  >
                    {type.service_type_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="setup_time">Thời gian chuẩn bị (phút)</Label>
              <Input
                type="number"
                name="setup_time"
                value={form.setup_time}
                onChange={handleServiceChange}
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="is_available">Có sẵn</Label>
              <Switch
                checked={form.is_available}
                onCheckedChange={(val) =>
                  handleServiceSwitch('is_available', val)
                }
              />
            </div>
            <div>
              <Label htmlFor="is_active">Hoạt động</Label>
              <Switch
                checked={form.is_active}
                onCheckedChange={(val) => handleServiceSwitch('is_active', val)}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleServiceChange}
              />
            </div>
          </div>
          <div>
            <label className="block font-bold mb-2">Hình ảnh dịch vụ</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removeImage(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang tạo...' : 'Tạo dịch vụ'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceModal;
