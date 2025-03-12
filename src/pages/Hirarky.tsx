import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import hirarkyStore from '../store/hirarkyStore';
import { Hirarky, HirarkyLevel, Role, User } from '@/restApi/utils/user';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHirarky } from '@/type/hirarky';
import { addHirarkyShcema } from '@/schema/hirarky';
import userStore from '../store/userStore';

const PageHirarky = () => {
  const { hirarkyList, getAllHirarky, createHirarky } = hirarkyStore();
  const { userList, allUser } = userStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    getAllHirarky(payload);
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
  } = useForm<addHirarky>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(addHirarkyShcema),
  });

  const onSubmit: SubmitHandler<addHirarky> = async (value) => {
    // await createHirarky(value);
    closeModal('add-role');
    reset();
    setTriger(!triger);
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

      <Modal id="add-hirarky">
        <h3 className="font-bold text-lg">Hierarchy</h3>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <Input
              type="text"
              placeholder="USER"
              // error={errors?.code}
              // {...register('code')}
            />
          </fieldset>
          <fieldset className="fieldset bg-base-100 border border-base-300 p-4 rounded-md">
            <legend className="fieldset-legend">Approver Level</legend>
            <div className="overflow-x-auto w-full">
              <table className="table table-auto table-zebra sm:table-fixed w-full">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Approver</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Adasd</td>
                    <td>
                      <button
                        className="btn btn-sm btn-ghost tooltip tooltip-error"
                        data-tip="delete"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="btn btn-xs btn-secondary tooltip tooltip-info"
                data-tip="add approver"
                onClick={() => {
                  openModal('approver'), allUser('');
                }}
              >
                <Plus />
              </button>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className={`textarea w-full ${
                errors.description && 'border-red-500'
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

      <Modal id="approver">
        <h3 className="font-bold text-lg">Users</h3>
        <div className="overflow-x-auto w-full mt-3">
          <table className="table table-auto table-zebra sm:table-fixed w-full">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    // onChange={(e) => {
                    //   if (e.target.checked) {
                    //     setSelectedRoles(roles?.items ?? []);
                    //   } else {
                    //     setSelectedRoles([]);
                    //   }
                    // }}
                  />
                </th>
                <th>Full Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userList?.items.map((item: User, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRoles.some(
                        (role) => role.id === item.id
                      )}
                      className="checkbox checkbox-accent"
                      // onChange={(e) => {
                      //   if (e.target.checked) {
                      //     setSelectedRoles([...selectedRoles, item]);
                      //   } else {
                      //     setSelectedRoles(
                      //       selectedRoles.filter((role) => role.id !== item.id)
                      //     );
                      //   }
                      // }}
                    />
                  </td>
                  <td>{item.fullName}</td>
                  <td className="flex flex-wrap gap-0.5">
                    <select
                      defaultValue="Pick a language"
                      className="select select-accent"
                    >
                      {item.roles.map((role: Role, i: number) => (
                        <option value={role.code} key={i}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('approver'), setSelectedRoles([]);
            }}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            // onClick={addRole}
          >
            Kirim
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PageHirarky;
