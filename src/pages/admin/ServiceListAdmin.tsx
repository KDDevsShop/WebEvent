import React, { useState, useEffect } from 'react';
import Datatable from '../../components/common/Datatable';
import ServiceDetail from './components/ServiceDetail';

import UpdateService from './components/UpdateService';
import serviceService from '../../services/serviceService';
import type { Service } from '../../services/serviceService';
import CreateServiceModal from './components/CreateServiceModal';

const columns = [
  { Header: 'ID', accessor: 'service_id' },
  { Header: 'Tên dịch vụ', accessor: 'service_name' },
  { Header: 'Loại dịch vụ', accessor: 'service_type_id' },
  {
    Header: 'Trạng thái',
    accessor: 'is_active',
    Cell: ({ value }) => (value ? 'Hoạt động' : 'Ẩn'),
  },
  { Header: 'Ngày cập nhật', accessor: 'updated_at' },
];

const ServiceListAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | null>(
    null,
  );
  const [deleteConfirmService, setDeleteConfirmService] =
    useState<Service | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const fetchServices = async (
    params: { search?: string; page?: number } = {},
  ) => {
    setLoading(true);
    try {
      const res = await serviceService.getAllServices({
        ...params,
        page: params.page ?? page, // Use param page if provided, else current state
        limit: pageSize,
      });
      console.log(res.data.services);
      setServices(res.data.services);
      setTotalPages(res.meta.totalPages);
      setError('');
    } catch (err: any) {
      setError('Lỗi tải danh sách dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchServices({ search, page: 1 });
  };

  const handleView = async (service: Service) => {
    try {
      // fetch detailed service including images by ID
      const detailedService = await serviceService.getServiceById(
        service.service_id.toString(),
      );
      setSelectedService(detailedService.data);
      setModalType('view');
    } catch (error) {
      console.error('Failed to load service details:', error);
      // optionally show error message
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setModalType('edit');
  };

  const handleCreate = () => {
    setModalType('create');
  };

  const handleDelete = async (service: Service) => {
    setDeleteConfirmService(service);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmService) return;
    setDeleteLoading(true);
    try {
      await serviceService.deleteService(
        deleteConfirmService.service_id.toString(),
      );
      fetchServices();
      setDeleteConfirmService(null);
    } catch (err) {
      setError('Lỗi xóa dịch vụ');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          Danh sách dịch vụ
        </h1>
        <button
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary transition"
          onClick={handleCreate}
        >
          + Thêm dịch vụ mới
        </button>
      </div>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm tên dịch vụ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-64 placeholder-amber-50"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
        >
          Tìm kiếm
        </button>
      </form>
      <Datatable
        columns={columns}
        data={services}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Modals */}
      {modalType === 'view' && selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === 'edit' && selectedService && (
        <UpdateService
          service={selectedService}
          onClose={() => setModalType(null)}
          onSuccess={fetchServices}
        />
      )}
      {modalType === 'create' && (
        <CreateServiceModal
          open={modalType === 'create'}
          onClose={() => setModalType(null)}
          onSuccess={fetchServices}
        />
      )}
      {/* Delete confirmation */}
      {deleteConfirmService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa dịch vụ</h2>
            <p>
              Bạn có chắc muốn xóa dịch vụ{' '}
              <b>{deleteConfirmService.service_name}</b>?
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteConfirmService(null)}
              >
                Hủy
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          className="btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Trước
        </button>
        <span className="mx-4">
          Trang {page} / {totalPages}
        </span>
        <button
          className="btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ServiceListAdmin;
