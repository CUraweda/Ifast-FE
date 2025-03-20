import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import hirarkyStore from '../store/hirarky.store';
import { Hirarky, HirarkyLevel, Role, User } from '@/restApi/utils/user';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHirarky } from '@/type/hirarky';
import { addHirarkyShcema } from '@/schema/hirarky';
import userStore from '../store/user.store';
import { HirarkyReq } from '@/restApi/hirarky.api';

const PageHirarky = () => {
  const { hirarkyList, getAllHirarky, createHirarky } = hirarkyStore();
  const { userList, allUser } = userStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const [selectedApprover, setSelectedApprover] = useState<any[]>([]);
  const [trigerSelect, setTrigerSelect] = useState<boolean>(false)

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    getAllHirarky(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  useEffect(() => {
    const payload: string = `limit=100&search=fullName:${searchUser}`;
    allUser(payload);
  }, [searchUser]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleAdd = (props: string) => {
    const payload: string = `limit=100&search=fullName:${searchUser}`;
    allUser(payload);
    openModal(props);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addHirarky>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(addHirarkyShcema),
  });

  const onSubmit: SubmitHandler<addHirarky> = async (value) => {

    const dataReq: HirarkyReq = {
      name: value.name,
      description: value.description,
      levels: selectedApprover.map(({ id, ...rest }) => rest)
    }
    console.log(selectedApprover);
    
    if (!selectedApprover || selectedApprover.length === 0) {
      setTrigerSelect(true);
      return;
    } 
    
    await createHirarky(dataReq);
    closeModal('add-hirarky');
    reset();
    setTriger(!triger);
    setTrigerSelect(false);
  };

  return (
    <>
      <div className="w-full p-3">
        <div className="w-full">
          <p className="text-2xl font-bold">Manage Hierarchy Users</p>
          <p className="text-sm">View and Manage Hierarchy</p>
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
              onClick={() => handleAdd('add-hirarky')}
            >
              <Plus />
              Add
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-col bg-neutral p-3 rounded shadow">
          <div className="overflow-x-auto w-full">
            <table className="table table-auto table-zebra sm:table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-12">No</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hirarkyList?.items.map((item: Hirarky, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="flex flex-col">
                      {item.levels.map((item: HirarkyLevel, i: number) => (
                        <span key={i}>
                          level {item.sequence} - {item.requiredRole} (
                          {item.approver.fullName})
                        </span>
                      ))}
                    </td>
                    <td>{item.description}</td>
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
              totalItems={hirarkyList?.total_items ?? 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>

      <Modal id="add-hirarky" width="w-3/4 max-w-2xl">
        <h3 className="font-bold text-lg">Hierarchy</h3>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <Input
              type="text"
              placeholder="Approval Level 1"
              error={errors?.name}
              {...register('name')}
            />
          </fieldset>
          <fieldset className={`fieldset bg-base-100 border  p-4 rounded-md ${trigerSelect ? 'border-red-500' : 'border-base-300'}`} >
            <legend className="fieldset-legend">Approver</legend>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Cari</legend>
              <Input
                type="text"
                placeholder="Search Name"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </fieldset>
            <div className="overflow-x-auto w-full max-h-96 overflow-auto">

              <table className="table table-auto table-zebra sm:table-fixed w-full">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Approver</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.items.map((item: User) =>
                    item.roles.map((roles: Role, j: number) => (
                      <tr key={j}>
                        <td>
                          <div className="flex gap-2" key={j}>
                            <input
                              type="checkbox"
                              checked={selectedApprover.some(
                                (role) =>
                                  role.id === roles.id &&
                                  role.approverId === item.id
                              )}
                              className="checkbox checkbox-accent"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedApprover([
                                    ...selectedApprover,
                                    {
                                      id: roles.id,
                                      sequence: selectedApprover.length + 1,
                                      requiredRole: roles.code,
                                      approverId: item.id,
                                    },
                                  ]);
                                } else {
                                  setSelectedApprover(
                                    selectedApprover.filter(
                                      (role) =>
                                        !(
                                          role.id === roles.id &&
                                          role.approverId === item.id
                                        )
                                    )
                                  );
                                }
                              }}
                            />
                            <span>{roles.name}</span>
                          </div>
                        </td>
                        <td>{item.fullName}</td>
                        <td>
                          {selectedApprover.find(
                            (role) =>
                              role.id === roles.id &&
                              role.approverId === item.id
                          )?.sequence || ''}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </fieldset>
          {
            trigerSelect && 
          <span className='text-xs text-red-500'>approver is required</span>
          }

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className={`textarea w-full ${errors.description && 'border-red-500'
                }`}
              placeholder="Description"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </fieldset>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('add-hirarky');
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

export default PageHirarky;
