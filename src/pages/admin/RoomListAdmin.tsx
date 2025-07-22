import React, { useEffect, useState } from 'react';
import Datatable from '../../components/common/Datatable';
import roomService from '../../services/roomService';

interface Room {
  room_id: number;
  room_name: string;
  guest_capacity?: number;
  base_price?: number;
  status?: string;
  is_active?: boolean;
  [key: string]: unknown;
}

const RoomListAdmin = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<Room>>({});
  const [formImages, setFormImages] = useState<File[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const fetchRooms = async (
    params: { search?: string; page?: number } = {},
  ) => {
    setLoading(true);
    setError('');
    try {
      const res = await roomService.getAllRooms({
        includeImages: true,
        search: params.search ?? search,
        page: params.page ?? page,
        limit: pageSize,
      });
      console.log(res.data);
      setRooms((res.data as Room[]) || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch {
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchRooms({ search, page: 1 });
  };

  const handleView = (room: Room) => {
    setSelectedRoom(room);
    setModalType('view');
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setFormData({ ...room });
    setFormImages([]);
    setModalType('edit');
  };

  const handleCreate = () => {
    setSelectedRoom(null);
    setFormData({
      room_name: '',
      guest_capacity: 0,
      base_price: 0,
      status: 'AVAILABLE',
      is_active: true,
    });
    setFormImages([]);
    setModalType('create');
  };

  const handleDelete = async (room: Room) => {
    if (!window.confirm(`Xác nhận xoá phòng "${room.room_name}"?`)) return;
    setDeleteLoading(true);
    try {
      await roomService.deleteRoom(room.room_id.toString());
      fetchRooms();
    } catch {
      alert('Xoá phòng thất bại');
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setModalType(null);
    setFormData({});
    setFormImages([]);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev: Partial<Room>) => ({
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
    try {
      const form = new FormData();
      // Exclude fields that should not be sent to backend
      const excludeKeys = ['room_id', 'created_at', 'updated_at', 'images'];
      const entries = Object.entries(formData).filter(
        ([key]) => !excludeKeys.includes(key),
      );
      entries.forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          form.append(key, String(value));
      });
      if (formImages.length > 0) {
        // Only support single image for now (backend: upload.single("image"))
        form.append('image', formImages[0]);
      }
      if (modalType === 'edit' && selectedRoom) {
        await roomService.api.request(`/${selectedRoom.room_id}`, 'PUT', form);
      } else if (modalType === 'create') {
        await roomService.api.request('/', 'POST', form);
      }
      fetchRooms();
      closeModal();
    } catch (err) {
      alert('Lưu phòng thất bại');
      console.log(err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6 bg-muted-foreground rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          Danh sách phòng
        </h1>
        <button
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary transition"
          onClick={handleCreate}
        >
          + Thêm phòng mới
        </button>
      </div>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm tên phòng..."
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
      {error && (
        <div className="mb-4" style={{ color: 'var(--destructive)' }}>
          {error}
        </div>
      )}
      <Datatable
        columns={[
          { Header: 'ID', accessor: 'room_id' },
          { Header: 'Tên phòng', accessor: 'room_name' },
          { Header: 'Sức chứa', accessor: 'guest_capacity' },
          { Header: 'Giá cơ bản', accessor: 'base_price' },
          { Header: 'Trạng thái', accessor: 'status' },
          {
            Header: 'Hoạt động',
            accessor: 'is_active',
            Cell: ({ value }) => (value ? '✔️' : '❌'),
          },
        ]}
        data={rooms}
        loading={loading || deleteLoading}
        rowClassName="hover:bg-indigo-50 transition"
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className="px-3 py-1 text-white border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 text-white border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal for view/edit/create */}
      {(modalType === 'view' ||
        modalType === 'edit' ||
        modalType === 'create') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={closeModal}
              title="Đóng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {modalType === 'view' && selectedRoom && (
              <div>
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  Thông tin phòng
                </h2>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">ID:</span>{' '}
                    {selectedRoom.room_id}
                  </div>
                  <div>
                    <span className="font-semibold">Tên phòng:</span>{' '}
                    {selectedRoom.room_name}
                  </div>
                  <div>
                    <span className="font-semibold">Sức chứa:</span>{' '}
                    {selectedRoom.guest_capacity}
                  </div>
                  <div>
                    <span className="font-semibold">Giá cơ bản:</span>{' '}
                    {selectedRoom.base_price}
                  </div>
                  <div>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    {selectedRoom.status}
                  </div>
                  <div>
                    <span className="font-semibold">Hoạt động:</span>{' '}
                    {selectedRoom.is_active ? '✔️' : '❌'}
                  </div>
                  {/* TODO: Show images if available */}
                </div>
              </div>
            )}
            {(modalType === 'edit' || modalType === 'create') && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  {modalType === 'edit' ? 'Cập nhật phòng' : 'Thêm phòng mới'}
                </h2>
                <div>
                  <label className="block font-semibold mb-1">Tên phòng</label>
                  <input
                    type="text"
                    name="room_name"
                    value={formData.room_name || ''}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sức chứa</label>
                  <input
                    type="number"
                    name="guest_capacity"
                    value={formData.guest_capacity || ''}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Giá cơ bản</label>
                  <input
                    type="number"
                    name="base_price"
                    value={formData.base_price || ''}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Trạng thái</label>
                  <select
                    name="status"
                    value={formData.status || 'AVAILABLE'}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Hoạt động</label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={!!formData.is_active}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Ảnh phòng</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formImages.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      {formImages[0].name}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={closeModal}
                    disabled={formLoading}
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    disabled={formLoading}
                  >
                    {formLoading ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomListAdmin;
