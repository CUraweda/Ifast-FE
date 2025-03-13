import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import rolesStore from '../store/roles.store';
import { Role } from '@/restApi/utils/user';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRole } from '@/type/roles';
import { addRoleShcema } from '@/schema/roles';

const Roles = () => {
  const { roles, getAllRoles , createRoles} = rolesStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    getAllRoles(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleAdd = (props: string) => {
    openModal(props);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addRole>({
    defaultValues: {
      code: '',
      name: '',
      description: '',
    },
    resolver: yupResolver(addRoleShcema),
  });
  const onSubmit: SubmitHandler<addRole> = async (value) => {
    await createRoles(value);
    closeModal('add-role');
    reset();
    setTriger(!triger);
  };
  return (
    <>
      <div className="w-full p-3">
        <div className="w-full">
          <p className="text-2xl font-bold">Manage Role Users</p>
          <p className="text-sm">View and Manage Roles</p>
        </div>
        <div className="mt-3 flex justify-end bg-neutral p-3 rounded shadow">
          <div className="flex gap-2 items-end">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cari</legend>
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </fieldset>
            <button
              className="btn btn-secondary mb-1"
              onClick={() => handleAdd('add-role')}
            >
              <Plus />
              Add
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-col bg-neutral p-3 rounded shadow">
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles?.items.map((item: Role, i: number) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>
                      <div>
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-warning"
                          data-tip="edit"
                        >
                          <BsPencil />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-error"
                          data-tip="delete"
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <Pagination
              totalItems={roles?.total_items ?? 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>

      <Modal id="add-role">
        <h3 className="font-bold text-lg">Role</h3>
        <form action="">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Code</legend>
            <Input
              type="text"
              placeholder="USER"
              error={errors?.code}
              {...register('code')}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <Input
              type="text"
              placeholder="USER"
              error={errors?.name}
              {...register('name')}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className={`textarea w-full ${errors.description && 'border-red-500' }` }
              placeholder="Description"
              {...register('description')}
            />
            {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
          </fieldset>
        </form>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('add-role');
            }}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            onClick={handleSubmit(onSubmit)}
          >
            Kirim
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Roles;
